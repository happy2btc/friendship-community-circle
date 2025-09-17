// Shared activity aggregation logic for community app
import { supabase } from '/lib/supabase.js';

const builderId = "81c50097-74f3-4c7a-b00c-598995b8d1cb";

export async function getActivitiesRaw() {
    // Fetch all activity data
    const [votesRes, suggestionsRes, commentsRes, offeringsRes, contributionsRes, profilesFullRes] = await Promise.all([
        supabase.from('agreement_votes').select('voter_id, created_at'),
        supabase.from('suggestions').select('author_id, created_at'),
        supabase.from('comments').select('author_id, created_at'),
        supabase.from('member_offerings').select('user_id, want, give, passion'),
        supabase.from('contributions').select('user_id, project, challenge, help, collab, skills, urgency, contact'),
        supabase.from('profiles').select('id, full_name, bio, avatar_url, youtube, twitter, substack, facebook, instagram, linkedin, website')
    ]);
    return {
        votes: votesRes.data,
        suggestions: suggestionsRes.data,
        comments: commentsRes.data,
        offerings: offeringsRes.data,
        contributions: contributionsRes.data,
        profilesFull: profilesFullRes.data
    };
}

export function aggregateActivities({ votes, suggestions, comments, offerings, contributions, profilesFull }) {
    const activity = {};
    const breakdown = {};

    // Votes
    votes?.forEach(v => {
        if (v.voter_id !== builderId) {
            activity[v.voter_id] = (activity[v.voter_id] || 0) + 1;
            breakdown[v.voter_id] = breakdown[v.voter_id] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
            breakdown[v.voter_id].votes += 1;
        }
    });
    // Suggestions
    suggestions?.forEach(s => {
        if (s.author_id !== builderId) {
            activity[s.author_id] = (activity[s.author_id] || 0) + 1;
            breakdown[s.author_id] = breakdown[s.author_id] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
            breakdown[s.author_id].suggestions += 1;
        }
    });
    // Comments
    comments?.forEach(c => {
        if (c.author_id !== builderId) {
            activity[c.author_id] = (activity[c.author_id] || 0) + 1;
            breakdown[c.author_id] = breakdown[c.author_id] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
            breakdown[c.author_id].comments += 1;
        }
    });
    // Wants, Offers, Passion
    offerings?.forEach(o => {
        if (o.user_id !== builderId) {
            let points = 0;
            breakdown[o.user_id] = breakdown[o.user_id] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
            if (o.want && o.want.trim() !== "") { breakdown[o.user_id].wants += 1; points += 1; }
            if (o.give && o.give.trim() !== "") { breakdown[o.user_id].offers += 1; points += 1; }
            if (o.passion && o.passion.trim() !== "") { breakdown[o.user_id].passion += 1; points += 1; }
            activity[o.user_id] = (activity[o.user_id] || 0) + points;
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
        breakdown[userId] = breakdown[userId] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
        let fieldsFilled = 0;
        contribs.forEach(con => {
            ['project','challenge','help','collab','skills','urgency','contact'].forEach(field => {
                if (con[field] && con[field].trim() !== '') {
                    fieldsFilled += 1;
                }
            });
        });
        breakdown[userId].projects += fieldsFilled;
        activity[userId] = (activity[userId] || 0) + fieldsFilled;
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
                breakdown[p.id] = breakdown[p.id] || { votes: 0, suggestions: 0, comments: 0, wants: 0, offers: 0, passion: 0, projects: 0, profile: 0 };
                breakdown[p.id].profile = 1;
                activity[p.id] = (activity[p.id] || 0) + 5;
            }
        }
    });
    return { activity, breakdown };
}

export async function getMemberActivities() {
    const raw = await getActivitiesRaw();
    const { activity, breakdown } = aggregateActivities(raw);
    // Get all involved user IDs
    const userIds = Object.keys(activity).filter(id => id && id !== 'null');
    if (userIds.length === 0) return [];
    // Get profiles for display
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, personal_story');
    // Map profiles by id
    const idToProfile = {};
    profiles?.forEach(p => { idToProfile[p.id] = p; });
    // Build member activity list
    const members = userIds.map(id => ({
        id,
        profile: idToProfile[id] || { full_name: id, avatar_url: '', personal_story: '' },
        total: activity[id],
        breakdown: breakdown[id]
    }));
    // Sort by most active
    members.sort((a, b) => b.total - a.total);
    return members;
}

export async function getMostActiveMember() {
    const members = await getMemberActivities();
    return members[0] || null;
}
