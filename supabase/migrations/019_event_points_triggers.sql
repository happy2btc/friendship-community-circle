-- migrate:up
-- Award 5 points to event creator when a new event is created
CREATE OR REPLACE FUNCTION award_points_for_event()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET points = COALESCE(points, 0) + 5 WHERE id = NEW.created_by;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_points_for_event
AFTER INSERT ON events
FOR EACH ROW
EXECUTE FUNCTION award_points_for_event();

-- Award 5 points to attendee when attendance is recorded
CREATE OR REPLACE FUNCTION award_points_for_attendance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET points = COALESCE(points, 0) + 5 WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_points_for_attendance
AFTER INSERT ON event_attendance
FOR EACH ROW
EXECUTE FUNCTION award_points_for_attendance();

-- migrate:down
DROP TRIGGER IF EXISTS trigger_award_points_for_event ON events;
DROP FUNCTION IF EXISTS award_points_for_event();
DROP TRIGGER IF EXISTS trigger_award_points_for_attendance ON event_attendance;
DROP FUNCTION IF EXISTS award_points_for_attendance();
