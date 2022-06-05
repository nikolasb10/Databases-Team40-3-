USE projectfunding;

CREATE TABLE researcher(
    Researcher_id char(5),
    First_name varchar(20) not null,
    Last_name varchar(20) not null,
    Gender varchar(20),
    Date_of_Birth varchar(10) not null,
    primary key (Researcher_id)
);

CREATE TABLE program(
    Program_id char(5),
    Administration varchar(20),
    primary key (Program_id)
);

CREATE TABLE executive(
	Executive_id char(5),
	First_name varchar(20) not null,
    Last_name varchar(20) not null,
	primary key (Executive_id)
);

CREATE TABLE organization_(
    Organization_Name varchar(20),
    Abbreviation varchar(20) unique,
    Phone_number char(10),
    City varchar(20),
    Postal_Code char(5),
    Street varchar(20),
    Organisation_Budget varchar(10),
    primary key (Organization_Name)
);

CREATE TABLE project(
	Project_id char(5),
    Researcher_id char(5),
    Organization_Name varchar(20),
    Executive_id char(5),
    Program_id char(5),
    Title varchar(20) not null,
    Summary varchar(20),
    Funding_amount varchar(7),
    Starting_Date char(10) not null,
    Ending_Date char(10),
    Duration char(2),
    primary key (Project_id),
    foreign key (Researcher_id) references researcher(Researcher_id),
    foreign key (Organization_Name) references organization_(Organization_Name),
    foreign key (Executive_id) references executive(Executive_id), 
    foreign key (Program_id) references program(Program_id)
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
	field_name varchar(20),
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



