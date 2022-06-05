USE projectfunding;

CREATE TABLE researcher(
    researcher_id char(5),
    Organization_Name varchar(100),
    First_name varchar(20) not null,
    Last_name varchar(20) not null,
    Gender varchar(20),
    Date_of_Birth varchar(10) not null,
    Starting_Date varchar(10) not null,
    primary key (Researcher_id),
    foreign key (Organization_Name) references organization_(Organization_Name)
);

CREATE TABLE program(
    Program_Name varchar(100),
    Administration varchar(50) not null,
    primary key (Program_Name)
);

CREATE TABLE executives(
	Executive_id char(5),
	First_name varchar(20) not null,
    Last_name varchar(20) not null,
	primary key (Executive_id)
);

CREATE TABLE organization(
    Organization_Name varchar(100),
    Abbreviation varchar(20) unique,
    Phone_number char(14),
    City varchar(20),
    Postal_Code char(5),
    Street varchar(50),
    Organisation_Budget varchar(10),
    Kind char(1),
    primary key (Organization_Name)
);

CREATE TABLE project(
	Project_id char(5),
    Researcher_id char(5),
    Organization_Name varchar(20),
    Executive_id char(5),
    Program_Name varchar(100),
    Title varchar(20) not null,
    Summary varchar(2000),
    Funding_amount varchar(7),
    Starting_Date char(10) not null,
    Ending_Date char(10),
    Duration char(2),
    primary key (Project_id),
    foreign key (Researcher_id) references researcher(Researcher_id),
    foreign key (Organization_Name) references organization_(Organization_Name),
    foreign key (Executive_id) references executives(Executive_id), 
    foreign key (Program_Name) references program(Program_Name)
);

CREATE TABLE review(
	Project_id char(5),
    Researcher_id char(5),
    Review_id char(5),
    Writing_Date char(10) not null,
    Grade varchar(2) not null,
    primary key (Project_id,Researcher_id,Review_id),
    foreign key (Project_id) references project(Project_id),
    foreign key (Researcher_id) references researcher(Researcher_id)
);

CREATE TABLE deliverable(
	title varchar(20),
	Project_id char(5),
	Summary varchar(5000),
	primary key (title,Project_id),
	foreign key (Project_id) references project(Project_id)
);

CREATE TABLE scientific_field(
	field_name varchar(50),
	primary key (field_name)
);

CREATE TABLE sc_field_of_project(
	field_name varchar(50),
	Project_id char(5),
	primary key (field_name,Project_id),
	foreign key (field_name) references scientific_field(field_name),
	foreign key (Project_id) references project(Project_id)
);

CREATE TABLE works_on(
	researcher_id char(5),
	Project_id char(5),
	primary key (researcher_id,Project_id),
	foreign key (researcher_id) references researcher(researcher_id),
	foreign key (Project_id) references project(Project_id)
);

ALTER TABLE researcher add age year;
UPDATE researcher
SET age = TIMESTAMPDIFF (YEAR, Date_of_birth,CURDATE())
WHERE researcher_id != '10000';

ALTER TABLE project add duration INT(2);
UPDATE project
SET duration = If(Ending_Date IS NOT NULL,
TIMESTAMPDIFF (MONTH, Starting_Date,Ending_Date), NULL)
WHERE project_id != '0';

ALTER TABLE works_on DROP FOREIGN KEY works_on_ibfk_1;
ALTER TABLE works_on DROP FOREIGN KEY works_on_ibfk_2;
ALTER TABLE works_on ADD FOREIGN KEY (researcher_id)  references researcher(researcher_id) ON DELETE CASCADE;
ALTER TABLE sc_field_of_project ADD FOREIGN KEY (Project_id)  references project(Project_id) ON DELETE CASCADE;


ALTER TABLE sc_field_of_project DROP FOREIGN KEY sc_field_of_project_ibfk_1;
ALTER TABLE sc_field_of_project DROP FOREIGN KEY sc_field_of_project_ibfk_2;
ALTER TABLE sc_field_of_project ADD FOREIGN KEY (field_name)  references scientific_field(field_name) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE sc_field_of_project ADD FOREIGN KEY (Project_id)  references project(Project_id) ON DELETE CASCADE;


ALTER TABLE deliverable DROP FOREIGN KEY deliverable_ibfk_1;
ALTER TABLE deliverable ADD FOREIGN KEY (Project_id)  references project(Project_id) ON DELETE CASCADE;


ALTER TABLE review DROP FOREIGN KEY review_ibfk_1;
ALTER TABLE review DROP FOREIGN KEY review_ibfk_2;
ALTER TABLE review ADD FOREIGN KEY (Project_id)  references project(Project_id) ON DELETE CASCADE;
ALTER TABLE review ADD FOREIGN KEY (Researcher_id)  references researcher(Researcher_id) ON DELETE CASCADE;


ALTER TABLE project DROP FOREIGN KEY project_ibfk_1;
ALTER TABLE project DROP FOREIGN KEY project_ibfk_2;
ALTER TABLE project DROP FOREIGN KEY project_ibfk_3;
ALTER TABLE project DROP FOREIGN KEY project_ibfk_4;
ALTER TABLE project ADD FOREIGN KEY (Researcher_id)  references researcher(Researcher_id) ON DELETE CASCADE;
ALTER TABLE project ADD FOREIGN KEY (Organization_Name)  references organization(Organization_Name) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE project ADD FOREIGN KEY (Executive_id)  references executives(Executive_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE project ADD FOREIGN KEY (Program_Name)  references program(Program_Name) ON DELETE CASCADE ON UPDATE CASCADE;

            
CREATE VIEW Researchers_And_Projects AS
SELECT E.first_name, E.last_name, P.project_id, P.title 
FROM Researcher as E 
LEFT JOIN Works_on as W
ON E.researcher_id = W.researcher_id
LEFT JOIN project as P
ON P.project_id = W.project_id
ORDER BY(E.researcher_id);

CREATE VIEW Researchers_And_Review AS
SELECT E.first_name, E.last_name, R.review_id, R.writing_date, R.grade
FROM Researcher as E 
LEFT JOIN review as R
ON E.researcher_id = R.researcher_id
ORDER BY(E.researcher_id);







     




