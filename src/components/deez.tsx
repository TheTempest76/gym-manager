import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="p-3 mb-4 bg-blue-100 rounded-full">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-center text-gray-600">{description}</p>
  </div>
);

const GymFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Easily track memberships, attendance, and personal training schedules in one place."
    },
    {
      icon: Calendar,
      title: "Class Scheduling",
      description: "Streamline class bookings and instructor assignments with our intuitive calendar system."
    },
    {
      icon: DollarSign,
      title: "Payment Processing",
      description: "Handle memberships, PT sessions, and additional services with secure payment integration."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Get insights into membership trends, class attendance, and revenue metrics."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Streamline Your Gym Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the tools you need to manage your fitness facility efficiently in one powerful platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GymFeatures;