// Shared activity aggregation logic for community app
import { supabase } from '/lib/supabase.js';

const builderId = "81c50097-74f3-4c7a-b00c-598995b8d1cb";

export async function getActivitiesRaw() {
    // Fetch all activity data
    const [votesRes, suggestionsRes, commentsRes, offeringsRes, contributionsRes, profilesFullRes, circlesRes, membersRes, celebrationsRes] = await Promise.all([
        supabase.from('agreement_votes').select('voter_id, created_at'),
        supabase.from('suggestions').select('author_id, created_at'),
        supabase.from('comments').select('author_id, created_at'),
        supabase.from('member_offerings').select('user_id, want, give, passion'),
        supabase.from('contributions').select('user_id, project, challenge, help, collab, skills, urgency, contact'),
        supabase.from('profiles').select('id, full_name, bio, avatar_url, youtube, twitter, substack, facebook, instagram, linkedin, website'),
        supabase.from('circles').select('creator_id'),
        supabase.from('circle_members').select('added_by'),
        supabase.from('celebrations').select('user_id')
    ]);
    return {
        votes: votesRes.data,
        suggestions: suggestionsRes.data,
        comments: commentsRes.data,
        offerings: offeringsRes.data,
        contributions: contributionsRes.data,
        profilesFull: profilesFullRes.data,
        circles: circlesRes.data,
        members: membersRes.data,
        celebrations: celebrationsRes.data
    };
}

export function aggregateActivities({ votes, suggestions, comments, offerings, contributions, profilesFull }) {
    const breakdown = {};

    // Helper to initialize breakdown for a user
    function initBreakdown(id) {
        if (!breakdown[id]) {
            breakdown[id] = {
                votes: 0,
                suggestions: 0,
                comments: 0,
                wants: 0,
                offers: 0,
                passion: 0,
                projects: 0,
                profile: 0,
                circles_created: 0,
                members_added: 0,
                celebrations_posted: 0,
                item_points: 0
            };
        }
    }

    // Votes
    votes?.forEach(v => {
        if (v.voter_id !== builderId) {
            initBreakdown(v.voter_id);
            breakdown[v.voter_id].votes += 1;
        }
    });
    // Suggestions
    suggestions?.forEach(s => {
        if (s.author_id !== builderId) {
            initBreakdown(s.author_id);
            breakdown[s.author_id].suggestions += 1;
        }
    });
    // Comments
    comments?.forEach(c => {
        if (c.author_id !== builderId) {
            initBreakdown(c.author_id);
            breakdown[c.author_id].comments += 1;
        }
    });
    // Wants, Offers, Passion
    offerings?.forEach(o => {
        if (o.user_id !== builderId) {
            initBreakdown(o.user_id);
            if (o.want && o.want.trim() !== "") breakdown[o.user_id].wants += 1;
            if (o.give && o.give.trim() !== "") breakdown[o.user_id].offers += 1;
            if (o.passion && o.passion.trim() !== "") breakdown[o.user_id].passion += 1;
        }
    });
    // Projects & Struggles
    const contribByUser = {};
    contributions?.forEach(con => {
        if (con.user_id !== builderId) {
            if (!contribByUser[con.user_id]) contribByUser[con.user_id] = [];
            contribByUser[con.user_id].push(con);
        }
    });
    Object.entries(contribByUser).forEach(([userId, contribs]) => {
        initBreakdown(userId);
        let fieldsFilled = 0;
        contribs.forEach(con => {
            ['project','challenge','help','collab','skills','urgency','contact'].forEach(field => {
                if (con[field] && con[field].trim() !== '') {
                    fieldsFilled += 1;
                }
            });
        });
        breakdown[userId].projects += fieldsFilled;
    });
    // Profile completion
    profilesFull?.forEach(p => {
        if (p.id !== builderId) {
            let filled = 0;
            if (p.full_name && p.full_name.trim() !== "") filled++;
            if (p.bio && p.bio.trim() !== "") filled++;
            if (p.avatar_url && p.avatar_url.trim() !== "") filled++;
            if (p.youtube || p.twitter || p.substack || p.facebook || p.instagram || p.linkedin || p.website) filled++;
            if (filled >= 2) {
                initBreakdown(p.id);
                breakdown[p.id].profile = 1;
            }
        }
    });
    // Circles created
    circles?.forEach(c => {
        if (c.creator_id && c.creator_id !== builderId) {
            initBreakdown(c.creator_id);
            breakdown[c.creator_id].circles_created += 1;
        }
    });
    // Members added
    members?.forEach(m => {
        if (m.added_by && m.added_by !== builderId) {
            initBreakdown(m.added_by);
            breakdown[m.added_by].members_added += 1;
        }
    });
    // Celebration wall posts
    celebrations?.forEach(c => {
        if (c.user_id && c.user_id !== builderId) {
            initBreakdown(c.user_id);
            breakdown[c.user_id].celebrations_posted += 1;
        }
    });
    // Item donations
    contributions?.forEach(con => {
        if (con.user_id !== builderId && con.type === 'item') {
            initBreakdown(con.user_id);
            breakdown[con.user_id].item_points = (breakdown[con.user_id].item_points || 0) + con.points;
        }
    });

    // Calculate total for each user
    const activity = {};
    Object.keys(breakdown).forEach(id => {
        if (id !== builderId) {
            activity[id] =
                (breakdown[id].votes || 0) * 1 +
                (breakdown[id].suggestions || 0) * 1 +
                (breakdown[id].comments || 0) * 1 +
                (breakdown[id].wants || 0) * 1 +
                (breakdown[id].offers || 0) * 1 +
                (breakdown[id].passion || 0) * 1 +
                (breakdown[id].projects || 0) * 1 +
                (breakdown[id].profile || 0) * 5 +
                (breakdown[id].circles_created || 0) * 10 +
                (breakdown[id].members_added || 0) * 2 +
                (breakdown[id].celebrations_posted || 0) * 5 +
                (breakdown[id].item_points || 0) * 3;
        }
    });
    return { activity, breakdown };
}

export async function getMemberActivities() {
    const raw = await getActivitiesRaw();
    const builderId = "81c50097-74f3-4c7a-b00c-598995b8d1cb";
    const breakdown = {};
    function initBreakdown(id) {
        if (!breakdown[id]) {
            breakdown[id] = {
                votes: 0,
                suggestions: 0,
                comments: 0,
                wants: 0,
                offers: 0,
                passion: 0,
                projects: 0,
                profile: 0,
                circles_created: 0,
                members_added: 0,
                celebrations_posted: 0,
                item_points: 0
            };
        }
    }
    // Votes
    raw.votes?.forEach(v => {
        if (v.voter_id !== builderId) {
            initBreakdown(v.voter_id);
            breakdown[v.voter_id].votes += 1;
        }
    });
    // Suggestions
    raw.suggestions?.forEach(s => {
        if (s.author_id !== builderId) {
            initBreakdown(s.author_id);
            breakdown[s.author_id].suggestions += 1;
        }
    });
    // Comments
    raw.comments?.forEach(c => {
        if (c.author_id !== builderId) {
            initBreakdown(c.author_id);
            breakdown[c.author_id].comments += 1;
        }
    });
    // Wants, Offers, Passion
    raw.offerings?.forEach(o => {
        if (o.user_id !== builderId) {
            initBreakdown(o.user_id);
            if (o.want && o.want.trim() !== "") breakdown[o.user_id].wants += 1;
            if (o.give && o.give.trim() !== "") breakdown[o.user_id].offers += 1;
            if (o.passion && o.passion.trim() !== "") breakdown[o.user_id].passion += 1;
        }
    });
    // Projects & Struggles
    const contribByUser = {};
    raw.contributions?.forEach(con => {
        if (con.user_id !== builderId) {
            if (!contribByUser[con.user_id]) contribByUser[con.user_id] = [];
            contribByUser[con.user_id].push(con);
        }
    });
    Object.entries(contribByUser).forEach(([userId, contribs]) => {
        initBreakdown(userId);
        let fieldsFilled = 0;
        contribs.forEach(con => {
            ['project','challenge','help','collab','skills','urgency','contact'].forEach(field => {
                if (con[field] && con[field].trim() !== '') {
                    fieldsFilled += 1;
                }
            });
        });
        breakdown[userId].projects += fieldsFilled;
    });
    // Profile completion
    raw.profilesFull?.forEach(p => {
        if (p.id !== builderId) {
            let filled = 0;
            if (p.full_name && p.full_name.trim() !== "") filled++;
            if (p.bio && p.bio.trim() !== "") filled++;
            if (p.avatar_url && p.avatar_url.trim() !== "") filled++;
            if (p.youtube || p.twitter || p.substack || p.facebook || p.instagram || p.linkedin || p.website) filled++;
            if (filled >= 2) {
                initBreakdown(p.id);
                breakdown[p.id].profile = 1;
            }
        }
    });
    // Circles created (user_id)
    if (Array.isArray(raw.circles)) {
        raw.circles.forEach(c => {
            const userId = c && c.user_id;
            if (userId && typeof userId === 'string' && userId.trim() !== '' && userId !== builderId) {
                initBreakdown(userId);
                breakdown[userId].circles_created += 1;
            }
        });
    } else if (raw.circles && typeof raw.circles === 'object' && raw.circles.user_id) {
        const userId = raw.circles.user_id;
        if (userId && typeof userId === 'string' && userId.trim() !== '' && userId !== builderId) {
            initBreakdown(userId);
            breakdown[userId].circles_created += 1;
        }
    }
    // Members added
    raw.members?.forEach(m => {
        const userId = m.added_by || m.user_id;
        if (userId && typeof userId === 'string' && userId.trim() !== '' && userId !== builderId) {
            initBreakdown(userId);
            breakdown[userId].members_added += 1;
        }
    });
    // Celebration wall posts
    raw.celebrations?.forEach(c => {
        const userId = c.user_id || c.creator_id;
        if (userId && typeof userId === 'string' && userId.trim() !== '' && userId !== builderId) {
            initBreakdown(userId);
            breakdown[userId].celebrations_posted += 1;
        }
    });
    // Item donations
    raw.contributions?.forEach(con => {
        if (con.user_id !== builderId && con.type === 'item') {
            initBreakdown(con.user_id);
            breakdown[con.user_id].item_points = (breakdown[con.user_id].item_points || 0) + con.points;
        }
    });
    // Get all involved user IDs
    const userIds = Object.keys(breakdown).filter(id => id && id !== 'null');
    if (userIds.length === 0) return [];
    // Get profiles for display
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, personal_story');
    // Map profiles by id
    const idToProfile = {};
    profiles?.forEach(p => { idToProfile[p.id] = p; });
    // Build member activity list
    const members = userIds.map(id => {
        const b = breakdown[id];
        const total =
            (b.votes || 0) * 1 +
            (b.suggestions || 0) * 1 +
            (b.comments || 0) * 1 +
            (b.wants || 0) * 1 +
            (b.offers || 0) * 1 +
            (b.passion || 0) * 1 +
            (b.projects || 0) * 1 +
            (b.profile || 0) * 5 +
            (b.circles_created || 0) * 10 +
            (b.members_added || 0) * 2 +
            (b.celebrations_posted || 0) * 5 +
            (b.item_points || 0) * 3;
        return {
            id,
            profile: idToProfile[id] || { full_name: id, avatar_url: '', personal_story: '' },
            total,
            breakdown: b
        };
    });
    // Sort by most active
    members.sort((a, b) => b.total - a.total);
    return members;
}

export async function getMostActiveMember() {
    const members = await getMemberActivities();
    return members[0] || null;
}
