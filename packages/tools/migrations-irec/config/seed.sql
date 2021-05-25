SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
/*
 ORGANIZATIONS
 */
INSERT INTO public."platform_organization" (
        "createdAt",
        "updatedAt",
        id,
        name,
        address,
        city,
        "zipCode",
        country,
        "businessType",
        "tradeRegistryCompanyNumber",
        "vatNumber",
        "signatoryFullName",
        "signatoryAddress",
        "signatoryCity",
        "signatoryZipCode",
        "signatoryCountry",
        "signatoryEmail",
        "signatoryPhoneNumber",
        status,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    )
VALUES (
        '2020-03-30 09:55:25.962333+02',
        '2020-03-30 09:55:25.962333+02',
        1,
        'Issuer Organization',
        'Address',
        'City',
        'Zip code',
        'GB',
        'Issuer',
        '1000',
        'UK1000',
        'Issuer signatory',
        'Address',
        'City',
        'Zip code',
        'GB',
        'issuer@mailinator.com',
        'Phone number',
        'Active',
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    );
INSERT INTO public."platform_organization" (
        "createdAt",
        "updatedAt",
        id,
        name,
        address,
        city,
        "zipCode",
        country,
        "businessType",
        "tradeRegistryCompanyNumber",
        "vatNumber",
        "signatoryFullName",
        "signatoryAddress",
        "signatoryCity",
        "signatoryZipCode",
        "signatoryCountry",
        "signatoryEmail",
        "signatoryPhoneNumber",
        status,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    )
VALUES (
        '2020-03-30 09:55:25.962333+02',
        '2020-03-30 09:55:25.962333+02',
        2,
        'Device Manager Organization',
        'Address',
        'City',
        'Zip code',
        'GB',
        'Issuer',
        '1000',
        'UK1000',
        'Issuer signatory',
        'Address',
        'City',
        'Zip code',
        'GB',
        'devicemanager@mailinator.com',
        'Phone number',
        'Active'
    );
INSERT INTO public."platform_organization" (
        "createdAt",
        "updatedAt",
        id,
        name,
        address,
        city,
        "zipCode",
        country,
        "businessType",
        "tradeRegistryCompanyNumber",
        "vatNumber",
        "signatoryFullName",
        "signatoryAddress",
        "signatoryCity",
        "signatoryZipCode",
        "signatoryCountry",
        "signatoryEmail",
        "signatoryPhoneNumber",
        status,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    )
VALUES (
        '2020-03-30 09:55:25.962333+02',
        '2020-03-30 09:55:25.962333+02',
        3,
        'Device Manager Second Organization',
        'Address',
        'City',
        'Zip code',
        'GB',
        'Issuer',
        '1000',
        'UK1000',
        'Issuer signatory',
        'Address',
        'City',
        'Zip code',
        'GB',
        'devicemanager2@mailinator.com',
        'Phone number',
        'Active'
    );
INSERT INTO public."platform_organization" (
        "createdAt",
        "updatedAt",
        id,
        name,
        address,
        city,
        "zipCode",
        country,
        "businessType",
        "tradeRegistryCompanyNumber",
        "vatNumber",
        "signatoryFullName",
        "signatoryAddress",
        "signatoryCity",
        "signatoryZipCode",
        "signatoryCountry",
        "signatoryEmail",
        "signatoryPhoneNumber",
        status,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    )
VALUES (
        '2020-03-30 09:55:25.962333+02',
        '2020-03-30 09:55:25.962333+02',
        4,
        'Trader Organization',
        'Address',
        'City',
        'Zip code',
        'GB',
        'Issuer',
        '1000',
        'UK1000',
        'Issuer signatory',
        'Address',
        'City',
        'Zip code',
        'GB',
        'trader@mailinator.com',
        'Phone number',
        'Active'
    );
INSERT INTO public."platform_organization" (
        "createdAt",
        "updatedAt",
        id,
        name,
        address,
        city,
        "zipCode",
        country,
        "businessType",
        "tradeRegistryCompanyNumber",
        "vatNumber",
        "signatoryFullName",
        "signatoryAddress",
        "signatoryCity",
        "signatoryZipCode",
        "signatoryCountry",
        "signatoryEmail",
        "signatoryPhoneNumber",
        status,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage"
    )
VALUES (
        '2020-03-30 09:55:25.962333+02',
        '2020-03-30 09:55:25.962333+02',
        5,
        'Platform Operator Organization',
        'Address',
        'City',
        'Zip code',
        'GB',
        'Issuer',
        '1000',
        'UK1000',
        'Operator',
        'Address',
        'City',
        'Zip code',
        'GB',
        'admin@mailinator.com',
        'Phone number',
        'Active'
    );
/*
 USERS
 */
INSERT INTO public."user" (
        "createdAt",
        "updatedAt",
        id,
        title,
        "firstName",
        "lastName",
        email,
        telephone,
        password,
        notifications,
        rights,
        "organizationId",
        status,
        "kycStatus"
    )
VALUES (
        '2020-03-30 10:08:33.510625+02',
        '2020-03-30 10:08:33.652639+02',
        1,
        'Mr',
        'Issuer',
        'Surname',
        'issuer@mailinator.com',
        '111-111-111',
        '$2a$08$R5nXlTeycdggncK6ElVtDehsv3ZUcBfyekPv5uYdt6dS76.rcAB.m',
        '0xd173313a51f8fc37bcf67569b463abd89d81844f',
        '0x09790e96275e023b965f6b267512b5267bcb18f5b5fdaaf46de899a0f91f2a8d006c7fbaebddf5ad36c116775c961aca3c32525b6dd1529bdee41eee5e9730a71c',
        'f',
        '8',
        '1',
        'Active',
        'Passed'
    );
INSERT INTO public."user" (
        "createdAt",
        "updatedAt",
        id,
        title,
        "firstName",
        "lastName",
        email,
        telephone,
        password,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage",
        notifications,
        rights,
        "organizationId",
        status,
        "kycStatus"
    )
VALUES (
        '2020-03-30 10:08:33.510625+02',
        '2020-03-30 10:08:33.652639+02',
        2,
        'Mr',
        'Device',
        'Manager',
        'devicemanager@mailinator.com',
        '111-111-111',
        '$2a$08$kBdGu/H3pAHzGupU2qB0NeHIBtRVCOFpLXkQay.LxnjGVm2oFxUSK',
        '0x5b1b89a48c1fb9b6ef7fb77c453f2aaf4b156d45',
        '0xe6f70568571f331ae431bb4d3249aaf4a01c548ddd6e0a1fbefdd207cf31b13d419f43ff28cf011df17697eb7856c470e361b4239898f53613cacbcc589e5d6a1c',
        't',
        '1',
        '2',
        'Active',
        'Passed'
    );
INSERT INTO public."user" (
        "createdAt",
        "updatedAt",
        id,
        title,
        "firstName",
        "lastName",
        email,
        telephone,
        password,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage",
        notifications,
        rights,
        "organizationId",
        status,
        "kycStatus"
    )
VALUES (
        '2020-03-30 10:08:33.510625+02',
        '2020-03-30 10:08:33.652639+02',
        3,
        'Mr',
        'Device',
        'Manager 2',
        'devicemanager2@mailinator.com',
        '111-111-111',
        '$2a$08$hxfSpn5Y7mZ9MjmcV5QdZemmi3aST8U2RFmod4bjpTZbWcwxAFgaO',
        '0xfd863c662307fcf0c15f0b9f74f1d06544f19908',
        '0x617ba0b0b20d547272001e2b1d9a9ef7da24b5e58c2a97767fb2e65a294010906862458c503dbe1a6db0db782cddf9bd98409bdaa0930754b3bd18863c8d99ab1b',
        't',
        '1',
        '3',
        'Active',
        'Passed'
    );
INSERT INTO public."user" (
        "createdAt",
        "updatedAt",
        id,
        title,
        "firstName",
        "lastName",
        email,
        telephone,
        password,
        "blockchainAccountAddress",
        "blockchainAccountSignedMessage",
        notifications,
        rights,
        "organizationId",
        status,
        "kycStatus"
    )
VALUES (
        '2020-03-30 10:08:33.510625+02',
        '2020-03-30 10:08:33.652639+02',
        4,
        'Mr',
        'Trader',
        'Surname',
        'trader@mailinator.com',
        '111-111-111',
        '$2a$08$j8LnGtFdbTfKN5F.0InfdO2gxMWXHbrjWvRziCIl0lRj.kxOKJ/b6',
        '0x7672fa3f8c04abbcbad14d896aad8bedece72d2b',
        '0xb0a804f410f2934278703eb992e5ba12f9e8b9068b68ff6d1246a56cf52e48677d3648057453d86f4372b2ffd98fa189aee1562d8c564ac62bc416d6cdc474051c',
        'f',
        '1',
        '4',
        'Active',
        'Passed'
    );
INSERT INTO "public"."user"(
        "createdAt",
        "updatedAt",
        "id",
        "title",
        "firstName",
        "lastName",
        "email",
        "telephone",
        "password",
        "notifications",
        "rights",
        "organizationId",
        "status",
        "kycStatus"
    )
VALUES (
        '2020-03-30 08:08:33.510625+00',
        '2020-03-30 08:08:33.652639+00',
        5,
        'Mr',
        'Admin',
        'Surname',
        'admin@mailinator.com',
        '111-111-111',
        '$2a$08$j8LnGtFdbTfKN5F.0InfdO2gxMWXHbrjWvRziCIl0lRj.kxOKJ/b6',
        'f',
        '16',
        5,
        'Active',
        'Passed'
    );
INSERT INTO "public"."user"(
        "createdAt",
        "updatedAt",
        "id",
        "title",
        "firstName",
        "lastName",
        "email",
        "telephone",
        "password",
        "notifications",
        "rights",
        "organizationId",
        "status",
        "kycStatus"
    )
VALUES (
        '2020-03-30 08:08:33.510625+00',
        '2020-03-30 08:08:33.652639+00',
        6,
        'Mr',
        'Agents',
        'Surname',
        'agents@mailinator.com',
        '111-111-111',
        '$2a$08$j8LnGtFdbTfKN5F.0InfdO2gxMWXHbrjWvRziCIl0lRj.kxOKJ/b6',
        'f',
        '32',
        5,
        'Active',
        'Passed'
    );
SELECT setval(
        pg_get_serial_sequence('public.user', 'id'),
        (
            SELECT MAX("id")
            FROM public.user
        ) + 1
    );
SELECT setval(
        pg_get_serial_sequence('public.platform_organization', 'id'),
        (
            SELECT MAX("id")
            FROM public.platform_organization
        ) + 1
    );
/*
 DEVICE REGISTRIES
 */
INSERT INTO public."irec_device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "ownerId",
        "code",
        "name",
        "defaultAccount",
        "deviceType",
        "fuel",
        "countryCode",
        "registrantOrganization",
        "issuer",
        "capacity",
        "commissioningDate",
        "registrationDate",
        "address",
        "latitude",
        "longitude",
        "notes",
        "status",
        "timezone",
        "gridOperator"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        '0e01b315-4f80-4d65-ab9d-84232769ef9d',
        '1',
        'TESTDEVICE001',
        'Wuthering Heights Windfarm',
        'ORG001TRADE001',
        'TC210',
        'ES200',
        'TH',
        'ORG001',
        'ISSER001',
        '10000',
        '2020-01-01T00:00:00.000Z',
        '2020-01-02T00:00:00.000Z',
        '95 Moo 7, Sa Si Mum Sub-district, Kamphaeng Saen District, Nakhon Province 73140',
        '14.059500',
        '99.977800',
        'Notes...',
        'Approved',
        'Asia/Bangkok',
        'TH-PEA'
    );
INSERT INTO public."device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "owner",
        "externalRegistryId",
        "smartMeterId",
        "description"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        'be2df88a-90c2-4dad-9de4-8ef423a7d3f0',
        '1',
        '0e01b315-4f80-4d65-ab9d-84232769ef9d',
        'METER001',
        'Wuthering Heights Windfarm description'
    );
INSERT INTO public."irec_device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "ownerId",
        "code",
        "name",
        "defaultAccount",
        "deviceType",
        "fuel",
        "countryCode",
        "registrantOrganization",
        "issuer",
        "capacity",
        "commissioningDate",
        "registrationDate",
        "address",
        "latitude",
        "longitude",
        "notes",
        "status",
        "timezone",
        "gridOperator"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        'd242c965-81a0-4917-afa1-f5217937afd6',
        '2',
        'TESTDEVICE002',
        'Solar Facility A',
        'ORG002TRADE001',
        'TC140',
        'ES100',
        'TH',
        'ORG002',
        'ISSER001',
        '70000',
        '2020-01-01T00:00:00.000Z',
        '2020-01-02T00:00:00.000Z',
        '1 Wind Farm Avenue, Thailand',
        '15.1739',
        '101.4928',
        'Notes...',
        'Approved',
        'Asia/Bangkok',
        'TH-MEA'
    );
INSERT INTO public."device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "owner",
        "externalRegistryId",
        "smartMeterId",
        "description"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        '5c9c6eb4-af2c-4336-8aae-1d579194bb4f',
        '2',
        'd242c965-81a0-4917-afa1-f5217937afd6',
        'METER002',
        'Solar Facility A description'
    );
INSERT INTO public."irec_device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "ownerId",
        "code",
        "name",
        "defaultAccount",
        "deviceType",
        "fuel",
        "countryCode",
        "registrantOrganization",
        "issuer",
        "capacity",
        "commissioningDate",
        "registrationDate",
        "address",
        "latitude",
        "longitude",
        "notes",
        "status",
        "timezone",
        "gridOperator"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        'd49f7fed-2f79-4d10-8985-41a0c3e9ba03',
        '3',
        'TESTDEVICE003',
        'Biomass Facility',
        'ORG003TRADE001',
        'TC140',
        'ES560',
        'TH',
        'ORG003',
        'ISSER001',
        '10000',
        '2020-01-01T00:00:00.000Z',
        '2020-01-02T00:00:00.000Z',
        '95 Moo 7, Sa Si Mum Sub-district, Kamphaeng Saen District, Nakhon Province 73140',
        '14.059500',
        '99.977800',
        'Notes...',
        'Approved',
        'Asia/Bangkok',
        'TH-PEA'
    );
INSERT INTO public."device_registry_device" (
        "createdAt",
        "updatedAt",
        "id",
        "owner",
        "externalRegistryId",
        "smartMeterId",
        "description"
    )
VALUES (
        '2020-03-30 09:36:02.607206+02',
        '2020-03-30 09:36:02.607206+02',
        '7f8fa2f6-d95a-4237-8e53-d9876318e077',
        '3',
        'd49f7fed-2f79-4d10-8985-41a0c3e9ba03',
        'METER003',
        'Biomass Facility description'
    );