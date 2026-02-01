import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  AlertCircle,
  ArrowUpRight,
  MoreHorizontal,
  Navigation
} from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:-translate-y-1 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
    <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={80} />
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${color} bg-opacity-10 text-white`}>
          <Icon size={24} />
        </div>
        <span className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change}
          <ArrowUpRight size={16} className={trend === 'down' ? 'rotate-90' : ''} />
        </span>
      </div>
      
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
    
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
  </div>
);

const ActivityItem = ({ title, time, status }: any) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
    <div className="mt-1">
      <div className="w-2 h-2 rounded-full bg-[#007BFF] shadow-[0_0_8px_#007BFF]" />
    </div>
    <div className="flex-1">
      <h4 className="text-slate-200 font-medium text-sm">{title}</h4>
      <p className="text-slate-500 text-xs mt-1">{time}</p>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full border ${
      status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
      status === 'In Progress' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
      'bg-amber-500/10 border-amber-500/20 text-amber-400'
    }`}>
      {status}
    </span>
  </div>
);

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 py-8 pb-20">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-lg text-slate-400">
          Welcome back, John. Here's your fleet's performance today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Active Routes" 
          value="12" 
          change="+24%" 
          trend="up" 
          icon={Navigation}
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Distance" 
          value="1,420 km" 
          change="+12%" 
          trend="up" 
          icon={MapPin}
          color="bg-purple-500"
        />
        <StatCard 
          title="On-Time Delivery" 
          value="98.5%" 
          change="+2.4%" 
          trend="up" 
          icon={Clock}
          color="bg-emerald-500"
        />
        <StatCard 
          title="Fleet Issues" 
          value="2" 
          change="-1" 
          trend="down" 
          icon={AlertCircle}
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Glassmorphism) */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">Efficiency Trends</h2>
              <p className="text-slate-400 text-sm">Fuel consumption vs. Distance traveled</p>
            </div>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          {/* Mock Chart Area */}
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, i) => (
              <div key={i} className="w-full bg-slate-800/50 rounded-t-sm relative group overflow-hidden">
                <div 
                  style={{ height: `${h}%` }} 
                  className="w-full absolute bottom-0 bg-gradient-to-t from-[#007BFF] to-[#00C6FF] opacity-80 group-hover:opacity-100 transition-all duration-300 rounded-t-sm"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-2">
            <ActivityItem 
              title="Route #1024 Started" 
              time="2 mins ago • Van 4" 
              status="In Progress" 
            />
            <ActivityItem 
              title="Delivery Completed" 
              time="15 mins ago • Downtown Route" 
              status="Completed" 
            />
            <ActivityItem 
              title="Maintenance Alert" 
              time="1 hour ago • Truck 2" 
              status="Alert" 
            />
            <ActivityItem 
              title="Route Optimized" 
              time="2 hours ago • North District" 
              status="Completed" 
            />
             <ActivityItem 
              title="Driver Check-in" 
              time="3 hours ago • Mike R." 
              status="In Progress" 
            />
          </div>
          
          <button className="w-full mt-6 py-3 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
