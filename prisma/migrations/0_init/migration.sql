-- CreateTable
CREATE TABLE "2023_ocm_summer_conferenceRegistration_csv" (
    "Registration ID" INTEGER,
    "First Name" VARCHAR(50),
    "Last Name" VARCHAR(50),
    "grade" VARCHAR(50),
    "birthdate" VARCHAR(50),
    "age" INTEGER,
    "gender" VARCHAR(50),
    "column8" VARCHAR(50),
    "column9" VARCHAR(50),
    "column10" VARCHAR(50),
    "column11" VARCHAR(50),
    "column12" VARCHAR(50),
    "column13" VARCHAR(50),
    "column14" VARCHAR(50),
    "column15" VARCHAR(50),
    "column16" VARCHAR(50),
    "column17" VARCHAR(50),
    "column18" VARCHAR(50),
    "column19" VARCHAR(50),
    "column20" VARCHAR(50),
    "column21" VARCHAR(50),
    "column22" VARCHAR(50),
    "column23" VARCHAR(50),
    "column24" VARCHAR(50),
    "column25" VARCHAR(50),
    "column26" VARCHAR(50),
    "column27" VARCHAR(50),
    "column28" VARCHAR(50),
    "column29" VARCHAR(50),
    "column30" VARCHAR(50),
    "column31" VARCHAR(50),
    "column32" VARCHAR(50),
    "column33" VARCHAR(50),
    "column34" VARCHAR(50),
    "column35" VARCHAR(50),
    "column36" VARCHAR(50),
    "column37" VARCHAR(50),
    "column38" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "cms_agm_2022" (
    "Ballot Number" INTEGER,
    "Attendee Name" VARCHAR(100),
    "DB First Name" VARCHAR(100),
    "DB Last Name" VARCHAR(100),
    "MemberShip Type" VARCHAR(32),
    "Home Email" VARCHAR(128)
);

-- CreateTable
CREATE TABLE "contacts4caring" (
    "Person ID" INTEGER,
    "Name Prefix" VARCHAR(200),
    "Given Name" VARCHAR(160),
    "First Name" VARCHAR(320),
    "Nickname" VARCHAR(160),
    "Middle Name" VARCHAR(100),
    "Last Name" VARCHAR(160),
    "Marital Status" VARCHAR(160),
    "Status" VARCHAR(100),
    "Membership" VARCHAR(320),
    "Home Address Street Line 1" VARCHAR(640),
    "Home Address Street Line 2" VARCHAR(320),
    "Home Address City" VARCHAR(320),
    "Home Address State" VARCHAR(160),
    "Home Address Zip Code" VARCHAR(160),
    "Mobile Phone Number" VARCHAR(128),
    "Home Phone Number" VARCHAR(320),
    "Home Email" VARCHAR(128),
    "Household ID" INTEGER,
    "Household Name" VARCHAR(32),
    "Household Primary Contact" BOOLEAN,
    "Created At" VARCHAR(160),
    "Updated At" VARCHAR(160)
);

-- CreateTable
CREATE TABLE "demo" (
    "pid" INTEGER,
    "name" VARCHAR(50),
    "price" DECIMAL(10,2)
);

-- CreateTable
CREATE TABLE "event_master" (
    "event_id" VARCHAR(15) NOT NULL,
    "event_cd" VARCHAR(15),
    "description" VARCHAR(50),
    "isactive" BIT(1),
    "created" DATE,
    "isdeletable" BIT(1),

    CONSTRAINT "event_master_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "ocm_co_worker01_csv" (
    "Name" VARCHAR(32),
    "Primary Email" VARCHAR(32),
    "Primary Phone Number" VARCHAR(16),
    "Church Life :: Fellowship (團契)" VARCHAR(16),
    "Church Life :: Worship Service" VARCHAR(128)
);

-- CreateTable
CREATE TABLE "oversea_chinese_mission_congregrational_meeting_q1_attendance_c" (
    "Name" VARCHAR(32),
    "Primary Email" VARCHAR(32),
    "Primary Phone Number" VARCHAR(16),
    "Church Life :: Fellowship (團契)" VARCHAR(16),
    "Church Life :: Worship Service" VARCHAR(128)
);

-- CreateTable
CREATE TABLE "oversea_chinese_mission_contact_master" (
    "Person ID" INTEGER,
    "Given Name" VARCHAR(500),
    "First Name" VARCHAR(500),
    "nickname" VARCHAR(500),
    "Middle Name" VARCHAR(500),
    "Last Name" VARCHAR(500),
    "birthdate" VARCHAR(500),
    "gender" VARCHAR(500),
    "Marital Status" VARCHAR(500),
    "status" VARCHAR(500),
    "membership" VARCHAR(500),
    "Home Address Street Line 1" VARCHAR(500),
    "Home Address Street Line 2" VARCHAR(500),
    "Home Address City" VARCHAR(500),
    "Home Address State" VARCHAR(500),
    "Home Address Zip Code" VARCHAR(500),
    "Mobile Phone Number" VARCHAR(500),
    "Home Phone Number" VARCHAR(500),
    "Home Email" VARCHAR(500),
    "Work Email" VARCHAR(500),
    "Other Email" VARCHAR(500),
    "Created At" VARCHAR(100),
    "Updated At" VARCHAR(100),
    "Remote ID" INTEGER
);

-- CreateTable
CREATE TABLE "people" (
    "pid" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "updatetime" TIMESTAMP(6),

    CONSTRAINT "people_details_ukey" PRIMARY KEY ("details")
);

-- CreateTable
CREATE TABLE "people_included" (
    "include_seq" INTEGER NOT NULL,
    "included" JSONB NOT NULL,
    "updatetime" TIMESTAMP(6),

    CONSTRAINT "people_included_ukey" PRIMARY KEY ("included")
);

-- CreateTable
CREATE TABLE "people_master" (
    "people_id" BIGINT,
    "fname" TEXT,
    "lname" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "vaccinated" TEXT
);

-- CreateTable
CREATE TABLE "peoplejs" (
    "pid" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "updatetime" TIMESTAMP(6),
    "vaccination" TIMESTAMP(6),
    "gift" TIMESTAMP(6),

    CONSTRAINT "details_ukey" PRIMARY KEY ("details")
);

-- CreateTable
CREATE TABLE "profilemaster" (
    "PersonID" BIGINT,
    "FirstName" TEXT,
    "LastName" TEXT,
    "Birthdate" TEXT,
    "Gender" TEXT,
    "MaritalStatus" TEXT,
    "Status" TEXT,
    "Membership" TEXT,
    "MobileNumber" TEXT,
    "HomeNumber" TEXT,
    "Email" TEXT,
    "CreatedAt" TEXT,
    "UpdatedAt" TEXT,
    "qrcodesent" DATE
);

-- CreateTable
CREATE TABLE "registrant_master" (
    "pid" INTEGER NOT NULL,
    "people_id" TEXT,
    "lname" TEXT,
    "fname" TEXT,
    "profile" TEXT,
    "household_id" TEXT,
    "lastsync" TIMESTAMP(6),
    "checkedin" TIMESTAMP(6),
    "checkedin_flag" BOOLEAN,
    "event_cd" VARCHAR
);

-- CreateTable
CREATE TABLE "registrantjs" (
    "pid" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "updatetime" TIMESTAMP(6),
    "checkedin" TIMESTAMP(6),
    "event_type" VARCHAR NOT NULL,

    CONSTRAINT "event_ukey" PRIMARY KEY ("details","event_type")
);

-- CreateTable
CREATE TABLE "registrants_staging" (
    "fname" VARCHAR(50) NOT NULL,
    "lname" VARCHAR(50) NOT NULL,
    "phonenumber" VARCHAR(50),
    "email_address" VARCHAR(50),
    "profile_picture" VARCHAR(1000)
);

-- CreateTable
CREATE TABLE "t_addresses" (
    "id" BIGSERIAL NOT NULL,
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "street" VARCHAR(100),
    "zip" VARCHAR(50),
    "location" VARCHAR(100),
    "primary" VARCHAR(30),

    CONSTRAINT "t_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_agm_attendance" (
    "people_id" INTEGER,
    "checkintime" TIMESTAMP(6) NOT NULL
);

-- CreateTable
CREATE TABLE "t_attendance" (
    "people_id" INTEGER,
    "checkintime" TIMESTAMP(6) NOT NULL
);

-- CreateTable
CREATE TABLE "t_emails" (
    "id" BIGSERIAL NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "primary" VARCHAR(100),
    "relations_person_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "t_emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_households" (
    "id" BIGSERIAL NOT NULL,
    "member_count" INTEGER,
    "relationships_people" VARCHAR(2000),

    CONSTRAINT "t_households_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_member_temp" (
    "valid_date" TEXT,
    "people_id" TEXT,
    "fname" TEXT,
    "lname" TEXT,
    "fullname" TEXT,
    "nickname" TEXT,
    "membership" TEXT,
    "chinese_membership" TEXT,
    "profile" TEXT,
    "qrcode_image_url" TEXT
);

-- CreateTable
CREATE TABLE "t_people" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "given_name" VARCHAR(50),
    "last_name" VARCHAR(50) NOT NULL,
    "nick_name" VARCHAR(50),
    "membership" VARCHAR(50),
    "status" VARCHAR(50),
    "households" VARCHAR(500),
    "phone" VARCHAR(100),

    CONSTRAINT "t_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_people_w_qrcode" (
    "valid_date" TEXT,
    "people_id" BIGINT NOT NULL,
    "fname" TEXT,
    "lname" TEXT,
    "fullname" TEXT,
    "nickname" TEXT,
    "membership" TEXT,
    "chinese_membership" TEXT,
    "profile" TEXT,
    "updated" TIMESTAMP(6),

    CONSTRAINT "people_unique" PRIMARY KEY ("people_id")
);

-- CreateTable
CREATE TABLE "t_pre_registrants" (
    "pid" INTEGER,
    "people_id" TEXT,
    "lname" TEXT,
    "fname" TEXT,
    "profile" TEXT,
    "household_id" TEXT,
    "lastsync" TIMESTAMP(6),
    "checkedin" TIMESTAMP(6),
    "checkedin_flag" BOOLEAN,
    "event_cd" VARCHAR,
    "vaccination" BOOLEAN,
    "gifted" BOOLEAN
);

-- CreateTable
CREATE TABLE "visitors_master" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "last_signed_in" TEXT,
    "events" TEXT NOT NULL,
    "active" BOOLEAN,

    CONSTRAINT "visitors_master_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ppl_idx" ON "people" USING GIN ("details" jsonb_path_ops);

-- CreateIndex
CREATE INDEX "ppl_include_idx" ON "people_included"("included");

-- CreateIndex
CREATE INDEX "reg_idx" ON "registrantjs"("details");

-- CreateIndex
CREATE UNIQUE INDEX "registrants_staging_email_address_key" ON "registrants_staging"("email_address");

