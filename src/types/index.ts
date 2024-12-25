import { Member, Staff, Class, Equipment, Attendance } from '@prisma/client'

// For forms/inputs
export interface StaffInput {
    name: string;
    email: string;
    phone: string;
    role: string;
    salary: string;
    status: string;
}

export interface ClassInput {
    name: string;
    staffId: string;
    schedule: string;
    maxCapacity: string;
    status: string;
}

export interface MemberInput {
    name: string;
    email: string;
    phone: string;
    membershipType: string;
    status: string;
}

export interface EquipmentInput {
    name: string;
    purchaseDate: string;
    cost: string;
    status: string;
    notes?: string;
}

// For API responses/data display
export type StaffWithClasses = Staff & {
    classes: Class[];
}

export type ClassWithStaff = Class & {
    staff: Staff;
}

export type MemberWithAttendance = Member & {
    attendances: Attendance[];
}