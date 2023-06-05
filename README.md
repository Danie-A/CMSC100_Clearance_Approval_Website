
# ClearMe

This project aims to develop an application clearance system where students can submit applications for review and clearance by their adviser and the clearance officer. The system ensures that each student can only have one open application at a time. Closed applications are removed from the review queues, streamlining the clearance process.


## Project Features

- Upload a CSV file mapping students to their adviser
- Fullscreen mode
- Beautiful UI
## Usage Guidelines

**Admin Guidelines**
1. Import Backup:
- Upload a CSV that automatically maps approved student accounts to their adviser.
2. Manage Accounts:
- Approve or disapprove creation of student accounts.
- Change account information for advisers.
3. View Applicaiton:
- See applicatino status and remarks of students.

**Student Guidelines**
1. Create an Account:
- Create an account with corresponding information
2. Application:
- Create an application and insert a link.
- View application and see status.
3. Notification
- Be notified when adviser rejects or accepts application along with remark.

**Adviser Guidelines**
1. Review Student Applications:
- Access the Application Clearance System.
- View the applications assigned to you for review.
- Review the application details, project description, and the provided GitHub repository link.
2. Approve Application:
- If the application meets the necessary requirements and is ready for clearance, approve the application.
- The application will proceed to the clearance officer for further review.

3. Return Application with Remarks:
- If the application requires revisions or has remarks, provide detailed feedback in the system.
- The student will receive a notification and can view your remarks.
- Await the resubmission of the application by the student for further review.


## Screenshots

## How To Run:

1. Open Git Bash.
2. Change the current working directory to the location where you want the cloned directory.
3. Clone the repository.
```
git clone https://github.com/CMSC100/project-araez_gonzales_repaso_sabile
```
4. Press Enter to create your local clone.
5. Change the current working directory to /frontend.
```
cd project-araez_gonzales_repaso_sabile/frontend
```
6. Install the necessary packages.
```
npm install
```
7. Run the frontend.
```
npm start
```
8. On another terminal, navigate to the /backend.
```
cd project-araez_gonzales_repaso_sabile/backend
```
9. Install the necessary packages.
```
npm install
```
10. Run the backend.
```
node index.js
```
If successful, it will return the text below in the terminal.
```
Connect to MongoDB
API listening to port 3001
```