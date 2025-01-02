'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface Staff {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    salary: string | number;
    status: string;
}

interface Class {
    currentCount: number;
    id: number;
    name: string;
    staffId: string;
    schedule: string;
    maxCapacity: string | number;
    status: string;
}

interface Member {
    id: number | null | undefined;
    joinDate: string | number | Date;
    name: string;
    email: string;
    phone: string;
    membershipType: string;
    status: string;
}

interface Equipment {
    id: number | null | undefined;
    lastMaintenance: any;
    name: string;
    purchaseDate: string;
    cost: string | number;
    status: string;
    notes: string;
}

const ViewPage = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [classList, setClassList] = useState<Class[]>([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Safe date formatting function
  const formatDate = (dateString: string | number | Date | null | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [staffRes, classRes, memberRes, equipmentRes] = await Promise.all([
          fetch('/api/staff'),
          fetch('/api/classes'),
          fetch('/api/member'),
          fetch('/api/equipment')
        ]);

        // Check if responses are ok
        if (!staffRes.ok) throw new Error('Failed to fetch staff data');
        if (!classRes.ok) throw new Error('Failed to fetch class data');
        if (!memberRes.ok) throw new Error('Failed to fetch member data');
        if (!equipmentRes.ok) throw new Error('Failed to fetch equipment data');

        // Parse JSON responses
        const staffData = await staffRes.json();
        const classData = await classRes.json();
        const memberData = await memberRes.json();
        const equipmentData = await equipmentRes.json();

        // Ensure we're working with arrays and handle potential response structures
        setStaffList(Array.isArray(staffData.data) ? staffData.data : 
                    Array.isArray(staffData) ? staffData : []);
        setClassList(Array.isArray(classData.data) ? classData.data : 
                    Array.isArray(classData) ? classData : []);
        setMemberList(Array.isArray(memberData.data) ? memberData.data : 
                     Array.isArray(memberData) ? memberData : []);
        setEquipmentList(Array.isArray(equipmentData.data) ? equipmentData.data : 
                        Array.isArray(equipmentData) ? equipmentData : []);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while fetching data');
        // Set empty arrays on error to prevent mapping issues
        setStaffList([]);
        setClassList([]);
        setMemberList([]);
        setEquipmentList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">View All Data</h1>
        <Link href="/get-started" className="text-blue-500 hover:text-blue-700">
          Create New Entry →
        </Link>
        <Link href={`/queries`} className="text-blue-500 hover:text-blue-700">
          Query Data →
        </Link>
      </div>
      
      <div className="space-y-6">
        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff List ({staffList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Salary</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.length > 0 ? (
                    staffList.map((staff) => (
                      <tr key={staff.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{staff.name}</td>
                        <td className="p-2">{staff.email}</td>
                        <td className="p-2">{staff.phone}</td>
                        <td className="p-2">{staff.role}</td>
                        <td className="p-2">${typeof staff.salary === 'number' ? staff.salary.toFixed(2) : staff.salary}</td>
                        <td className="p-2">{staff.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-500">
                        No staff members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Classes List */}
        <Card>
          <CardHeader>
            <CardTitle>Classes List ({classList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Instructor</th>
                    <th className="p-2 text-left">Schedule</th>
                    <th className="p-2 text-left">Capacity</th>
                    <th className="p-2 text-left">Current Count</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classList.length > 0 ? (
                    classList.map((class_) => (
                      <tr key={class_.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{class_.name}</td>
                        <td className="p-2">
                          {staffList.find(staff => staff.id === Number(class_.staffId))?.name || 'Unknown'}
                        </td>
                        <td className="p-2">{formatDate(class_.schedule)}</td>
                        <td className="p-2">{class_.maxCapacity}</td>
                        <td className="p-2">{class_.currentCount}</td>
                        <td className="p-2">{class_.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-500">
                        No classes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Members List ({memberList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Membership Type</th>
                    <th className="p-2 text-left">Join Date</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList.length > 0 ? (
                    memberList.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{member.name}</td>
                        <td className="p-2">{member.email}</td>
                        <td className="p-2">{member.phone}</td>
                        <td className="p-2">{member.membershipType}</td>
                        <td className="p-2">{formatDate(member.joinDate)}</td>
                        <td className="p-2">{member.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-500">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Equipment List */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment List ({equipmentList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Purchase Date</th>
                    <th className="p-2 text-left">Cost</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Last Maintenance</th>
                    <th className="p-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.length > 0 ? (
                    equipmentList.map((equipment) => (
                      <tr key={equipment.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{equipment.name}</td>
                        <td className="p-2">{formatDate(equipment.purchaseDate)}</td>
                        <td className="p-2">${typeof equipment.cost === 'number' ? equipment.cost.toFixed(2) : equipment.cost}</td>
                        <td className="p-2">{equipment.status}</td>
                        <td className="p-2">{formatDate(equipment.lastMaintenance)}</td>
                        <td className="p-2">{equipment.notes || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-500">
                        No equipment found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewPage;