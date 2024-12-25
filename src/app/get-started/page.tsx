'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

const CreatePage = () => {
  // State for forms
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'trainer',
    salary: 0,
    status: 'active'
  });

  const [class_, setClass] = useState({
    name: '',
    staffId: '',
    schedule: '',
    maxCapacity: '',
    status: 'scheduled'
  });

  const [member, setMember] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'basic',
    status: 'active'
  });

  const [equipment, setEquipment] = useState({
    name: '',
    purchaseDate: '',
    cost: '',
    status: 'active',
    notes: ''
  });

  const [staffList, setStaffList] = useState<{ id: number; name: string }[]>([]);

  // Fetch staff for class creation
  useEffect(() => {
    fetch('/api/staff')
      .then(res => res.json())
      .then(data => setStaffList(data))
      .catch(err => console.error('Error fetching staff:', err));
  }, []);

  // Submit handlers
interface Staff {
    name: string;
    email: string;
    phone: string;
    role: string;
    salary: string | number;
    status: string;
}

interface Class {
    name: string;
    staffId: string;
    schedule: string;
    maxCapacity: string | number;
    status: string;
}

interface Member {
    name: string;
    email: string;
    phone: string;
    membershipType: string;
    status: string;
}

interface Equipment {
    name: string;
    purchaseDate: string;
    cost: string | number;
    status: string;
    notes: string;
}

const handleSubmit = async (endpoint: 'staff' | 'classes' | 'member' | 'equipment', data: Staff | Class | Member | Equipment) => {
    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Failed to create');
        
        // Reset form
        switch(endpoint) {
            case 'staff':
                setStaff({ name: '', email: '', phone: '', role: 'trainer', salary: 0, status: 'active' });
                break;
            case 'classes':
                setClass({ name: '', staffId: '', schedule: '', maxCapacity: '', status: 'scheduled' });
                break;
            case 'member':
                setMember({ name: '', email: '', phone: '', membershipType: 'basic', status: 'active' });
                break;
            case 'equipment':
                setEquipment({ name: '', purchaseDate: '', cost: '', status: 'active', notes: '' });
                break;
        }
        
        alert(`${endpoint} created successfully!`);
    } catch (error) {
        console.error('Error:', error);
        alert(`Error creating ${endpoint}`);
    }
};

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Entries</h1>
        <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
          View All Data →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Staff Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('staff', staff);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staff-name">Name</Label>
                <Input
                  id="staff-name"
                  value={staff.name}
                  onChange={(e) => setStaff({...staff, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input
                  id="staff-email"
                  type="email"
                  value={staff.email}
                  onChange={(e) => setStaff({...staff, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-phone">Phone</Label>
                <Input
                  id="staff-phone"
                  value={staff.phone}
                  onChange={(e) => setStaff({...staff, phone: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-role">Role</Label>
                <Select value={staff.role} onValueChange={(value) => setStaff({...staff, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-salary">Salary</Label>
                <Input
                  id="staff-salary"
                  type="number"
                  value={staff.salary}
                  onChange={(e) => setStaff({...staff, salary: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Staff</Button>
            </form>
          </CardContent>
        </Card>

        {/* Class Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('classes', class_);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="class-name">Name</Label>
                <Input
                  id="class-name"
                  value={class_.name}
                  onChange={(e) => setClass({...class_, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class-staff">Staff</Label>
                <Select 
                  value={class_.staffId.toString()} 
                  onValueChange={(value) => setClass({...class_, staffId: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {staffList.map(staff => (
                      <SelectItem key={staff.id} value={staff.id.toString()}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class-schedule">Schedule</Label>
                <Input
                  id="class-schedule"
                  type="datetime-local"
                  value={class_.schedule}
                  onChange={(e) => setClass({...class_, schedule: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class-capacity">Max Capacity</Label>
                <Input
                  id="class-capacity"
                  type="number"
                  value={class_.maxCapacity}
                  onChange={(e) => setClass({...class_, maxCapacity: (e.target.value)})}
                  required
                />
              </div>
              <div className='pt-4'>   
                              <Button type="submit" className="w-full ">Add Class</Button>

              </div>
            </form>
          </CardContent>
        </Card>

        {/* Member Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('member', member);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="member-name">Name</Label>
                <Input
                  id="member-name"
                  value={member.name}
                  onChange={(e) => setMember({...member, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-email">Email</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={member.email}
                  onChange={(e) => setMember({...member, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-phone">Phone</Label>
                <Input
                  id="member-phone"
                  value={member.phone}
                  onChange={(e) => setMember({...member, phone: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-type">Membership Type</Label>
                <Select value={member.membershipType} onValueChange={(value) => setMember({...member, membershipType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Member</Button>
            </form>
          </CardContent>
        </Card>

        {/* Equipment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit('equipment', equipment);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="equipment-name">Name</Label>
                <Input
                  id="equipment-name"
                  value={equipment.name}
                  onChange={(e) => setEquipment({...equipment, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-date">Purchase Date</Label>
                <Input
                  id="equipment-date"
                  type="date"
                  value={equipment.purchaseDate}
                  onChange={(e) => setEquipment({...equipment, purchaseDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-cost">Cost</Label>
                <Input
                  id="equipment-cost"
                  type="number"
                  value={equipment.cost}
                  onChange={(e) => setEquipment({...equipment, cost: (e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-notes">Notes</Label>
                <Input
                  id="equipment-notes"
                  value={equipment.notes}
                  onChange={(e) => setEquipment({...equipment, notes: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full">Add Equipment</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePage;