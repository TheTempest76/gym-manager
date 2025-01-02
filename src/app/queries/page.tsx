// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QueryResult {
  isLoading: boolean;
  error: string | null;
  data: any;
}

export default function DashboardPage() {
  // States for different queries
  const [memberQuery, setMemberQuery] = useState<QueryResult>({ isLoading: false, error: null, data: null });
  const [classQuery, setClassQuery] = useState<QueryResult>({ isLoading: false, error: null, data: null });
  const [attendanceQuery, setAttendanceQuery] = useState<QueryResult>({ isLoading: false, error: null, data: null });
  const [equipmentQuery, setEquipmentQuery] = useState<QueryResult>({ isLoading: false, error: null, data: null });
  const [staffQuery, setStaffQuery] = useState<QueryResult>({ isLoading: false, error: null, data: null });

  // Query 1: Search members by membership type and status
  const searchMembers = async (membershipType: string, status: string) => {
    setMemberQuery({ isLoading: true, error: null, data: null });
    try {
      const response = await fetch(`/api/member/query?membershipType=${membershipType}&status=${status}`);
      const data = await response.json();
      setMemberQuery({ isLoading: false, error: null, data });
    } catch (error) {
      setMemberQuery({ isLoading: false, error: 'Failed to fetch members', data: null });
    }
  };

  // Query 2: Get class schedule for a specific trainer
  const getTrainerClasses = async (staffId: number) => {
    setClassQuery({ isLoading: true, error: null, data: null });
    try {
      const response = await fetch(`/api/classes/query/${staffId}`);
      const data = await response.json();
      setClassQuery({ isLoading: false, error: null, data });
    } catch (error) {
      setClassQuery({ isLoading: false, error: 'Failed to fetch classes', data: null });
    }
  };

  // Query 3: Get attendance statistics for a date range
  const getAttendanceStats = async (startDate: string, endDate: string) => {
    setAttendanceQuery({ isLoading: true, error: null, data: null });
    try {
      const response = await fetch(`/api/attendance?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setAttendanceQuery({ isLoading: false, error: null, data });
    } catch (error) {
      setAttendanceQuery({ isLoading: false, error: 'Failed to fetch attendance', data: null });
    }
  };

  // Query 4: Get equipment maintenance schedule
  const getEquipmentMaintenance = async () => {
    setEquipmentQuery({ isLoading: true, error: null, data: null });
    try {
      const response = await fetch('/api/equipment/maintenance');
      const data = await response.json();
      setEquipmentQuery({ isLoading: false, error: null, data });
    } catch (error) {
      setEquipmentQuery({ isLoading: false, error: 'Failed to fetch equipment data', data: null });
    }
  };

  // Query 5: Get staff performance metrics
  const getStaffMetrics = async (role: string) => {
    setStaffQuery({ isLoading: true, error: null, data: null });
    try {
      const response = await fetch(`/api/staff/metrics?role=${role}`);
      const data = await response.json();
      setStaffQuery({ isLoading: false, error: null, data });
    } catch (error) {
      setStaffQuery({ isLoading: false, error: 'Failed to fetch staff metrics', data: null });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Search for your queries</h1>
      
      {/* Member Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Member Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={(value) => searchMembers(value, 'active')}>
              <SelectTrigger>
                <SelectValue placeholder="Select membership type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            {memberQuery.isLoading && <p>Loading...</p>}
            {memberQuery.error && <Alert variant="destructive"><AlertDescription>{memberQuery.error}</AlertDescription></Alert>}
            {memberQuery.data && (
              <div className="space-y-2">
                {memberQuery.data.map((member: any) => (
                  <div key={member.id} className="p-2 border rounded">
                    <p>{member.name} - {member.membershipType}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Class Schedule Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trainer Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter trainer ID"
              onChange={(e) => getTrainerClasses(parseInt(e.target.value))}
            />
            {classQuery.isLoading && <p>Loading...</p>}
            {classQuery.error && <Alert variant="destructive"><AlertDescription>{classQuery.error}</AlertDescription></Alert>}
            {classQuery.data && (
              <div className="space-y-2">
                {classQuery.data.map((classItem: any) => (
                  <div key={classItem.id} className="p-2 border rounded">
                    <p>{classItem.name} - {new Date(classItem.schedule).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Input type="date" onChange={(e) => getAttendanceStats(e.target.value, '')} />
              <Input type="date" onChange={(e) => getAttendanceStats('', e.target.value)} />
            </div>
            {attendanceQuery.isLoading && <p>Loading...</p>}
            {attendanceQuery.error && <Alert variant="destructive"><AlertDescription>{attendanceQuery.error}</AlertDescription></Alert>}
            {attendanceQuery.data && (
              <div>
                <p>Total Check-ins: {attendanceQuery.data.totalCheckins}</p>
                <p>Average Daily Attendance: {attendanceQuery.data.averageDaily}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Maintenance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => getEquipmentMaintenance()}>View Maintenance Schedule</Button>
            {equipmentQuery.isLoading && <p>Loading...</p>}
            {equipmentQuery.error && <Alert variant="destructive"><AlertDescription>{equipmentQuery.error}</AlertDescription></Alert>}
            {equipmentQuery.data && (
              <div className="space-y-2">
                {equipmentQuery.data.map((equipment: any) => (
                  <div key={equipment.id} className="p-2 border rounded">
                    <p>{equipment.name} - Last Maintenance: {new Date(equipment.lastMaintenance).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Staff Metrics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={(value) => getStaffMetrics(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select staff role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
              </SelectContent>
            </Select>
            {staffQuery.isLoading && <p>Loading...</p>}
            {staffQuery.error && <Alert variant="destructive"><AlertDescription>{staffQuery.error}</AlertDescription></Alert>}
            {staffQuery.data && (
              <div className="space-y-2">
                {staffQuery.data.map((staff: any) => (
                  <div key={staff.id} className="p-2 border rounded">
                    <p>{staff.name} - Performance Score: {staff.performanceScore}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}