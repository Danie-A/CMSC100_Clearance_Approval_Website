# ClearMe

## Authors:

Danielle Lei Araez  
Katrina Gonzales  
Laurenz Repaso  
Jerico Sabile  
CMSC 100 Project - UV2L

## Program Description:

ClearMe is a software program designed to streamline and automate the clearance approval process for students within the Institute of Computer Science. The system facilitates the efficient issuance of clearances by allowing students to obtain approvals from specific sections of the institute in a predetermined order. It also ensures that students provide the necessary proof of completion where required.

## Project Features:

1. User Registration: The system allows students to register their accounts using their unique student identification numbers and other relevant information.

2. Clearance Application: Once registered, students can initiate the clearance application process by providing the necessary details, such as their name, academic program, and GitHub link of their project.

3. Approval Workflow: The system enforces a predefined workflow for clearance approvals. Certain sections or departments within the institute are designated as approval authorities, and students must obtain approvals from them in a specific order. For instance, a student may need to obtain approval from their adviser and clearance officer.

4. Clearance Document: The system allows students to generate, view, and download the clearance approval completion document in a PDF file format.

5. Notifications and Reminders: The system automatically generates notifications to inform students about pending approvals or changes in their clearance approval status. This helps students stay on track and ensures that the clearance process progresses smoothly.

6. Tracking and Reporting: The system maintains a comprehensive record of each student's clearance application, including the status of approvals obtained and any pending requirements.

7. Clearance Officer and Adviser Access: The system provides access to clearance officers and advisers, allowing them to review and approve clearance applications submitted by students. They can also track the progress of clearance applications and provide feedback or additional instructions to students as needed.

## Screenshots:

- Figma Layout: https://www.figma.com/file/PooqpMu5OhUnmvKPjSVp5P/CLEAR-ME?type=design&node-id=0%3A1&t=WuIZnhRGnPJGlTmr-1

**SIGN UP | LOG IN**
![6 - BMSnmmc](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/5d898572-142b-45f2-ae30-bd84ac43aa31)

**ADMIN**
![1 - SjtkYpd](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/28029f63-a3ef-45df-b069-404b23b9fca7)
![2 - RNA9gRg](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/5eb6c929-57d3-4c0b-b902-c46af6d49819)
![3 - zYmnuNt](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/0814da99-888d-4bbe-b671-247a80130f85)
![4 - aFvbJsK](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/86ef60f1-40b0-465d-931e-f60bd0708eca)
![5 - GToOd5E](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/c6f4c024-d506-4400-aaff-bb461cd7e348)

**STUDENT**
![7 - McKfIr2](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/54737f1b-3384-46ab-bdb1-25a448742bc8)
![12 - dPipZtx](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/87cb3110-2457-4bfc-9756-7fd87c0f94f3)
![13 - GPey56z](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/e575b68b-abe9-46c8-a243-3afd41e22df9)
![14 - C9X1gEt](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/547002a5-5bc1-4991-9d7c-3a45bdc02225)

**ADVISER**
![8 - JRqYlIv](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/2cb6bfef-14d8-4c71-a6e9-1bd04b4f7217)
![9 - zXGrgTH](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/74653c1e-603e-4b64-a7a3-8adbf3979e27)
![10 - NWCj2LO](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/054751bb-5c04-4e25-894c-0da6279e3f83)
![11 - x2M5sgI](https://github.com/CMSC100/project-araez_gonzales_repaso_sabile/assets/125255934/15b3f9c1-bc9a-4290-8a6e-e21477a2f6c5)

## How to Run:

1. Make sure to download the necessary packages and applications for web development (e.g., IDE such as VS Code, MongoDBCompass, npm). Clone the repository to your local machine using the following command:

```bash
   git clone https://github.com/Danie-A/CMSC100_Clearance_Approval_Website.git
```

2. Install the required node modules by running the following command in the terminal:

```bash
   npm install
```

3. Open two terminals and go to the respective `frontend` and `backend` directories. Run the following command to start the server:

```bash
   cd frontend/
   npm start
```

```bash
   cd backend/
   npm start
```

4. If you are a `student`, you may create an account through the Sign Up option, then once again inputting your credentials to log in as a student.

5. If you are an `adviser`, you need to coordinate with the admin in order to create an adviser account in order for the adviser to log in successfully.

6. There are three steps before the student can successfully generate a clearance completion document.

`Step 1`: The student must create a clearance application by filling out the necessary details.<br>
`Step 2`: The student must wait for the adviser to approve the clearance application.<br>
`Step 3`: The student must wait for the clearance officer (admin) to approve the clearance application.

If you encounter any issues during the process or have specific questions about the ClearMe program, you may contact one of the authors through this email address:

Danielle Lei Araez: `draraez@up.edu.ph`
