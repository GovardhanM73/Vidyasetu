Teacher
plaintext
Copy
Edit
FUNCTION TeacherDashboard()
  DISPLAY AnalyticsOverview
  DISPLAY NotificationPanel
  DISPLAY AnnouncementForm

  IF PostAnnouncementButton CLICKED THEN
    SEND Announcement TO AllStudents
  END IF

  IF SendNotificationButton CLICKED THEN
    TRIGGER Notification TO SelectedClasses
  END IF
END FUNCTION
Student
plaintext
Copy
Edit
FUNCTION StudentDashboard()
  DISPLAY LearningProgressChart
  DISPLAY UpcomingClassReminders
  DISPLAY AITutorInterface

  IF ViewAITutorButton CLICKED THEN
    INITIATE ChatInterface()
  END IF
END FUNCTION
