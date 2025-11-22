import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, CheckCircle, XCircle, Search, Filter, LogOut, Eye, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [nominations, setNominations] = useState([]);
  const [filteredNominations, setFilteredNominations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  // Mock nominations data
  useEffect(() => {
    const mockNominations = [
      {
        id: 1,
        candidateName: 'Dr. Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        category: 'Pharma & Healthcare',
        organization: 'City Hospital',
        achievements: 'Led breakthrough research in cancer treatment, published 50+ papers, received international recognition.',
        status: 'pending',
        submittedDate: '2024-01-15'
      },
      {
        id: 2,
        candidateName: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543211',
        category: 'Business & Entrepreneurship',
        organization: 'Tech Innovations Ltd',
        achievements: 'Founded successful startup, created 500+ jobs, raised $10M in funding.',
        status: 'approved',
        submittedDate: '2024-01-10'
      },
      {
        id: 3,
        candidateName: 'Anita Desai',
        email: 'anita@example.com',
        phone: '9876543212',
        category: 'Film & Entertainment',
        organization: 'Independent',
        achievements: 'Award-winning director, 10+ critically acclaimed films, international film festival recognition.',
        status: 'rejected',
        submittedDate: '2024-01-08'
      }
    ];
    setNominations(mockNominations);
    setFilteredNominations(mockNominations);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = nominations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(nom =>
        nom.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nom.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nom.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(nom => nom.category === filterCategory);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(nom => nom.status === filterStatus);
    }

    setFilteredNominations(filtered);
  }, [searchTerm, filterCategory, filterStatus, nominations]);

  const handleStatusChange = (id, newStatus) => {
    setNominations(prev =>
      prev.map(nom =>
        nom.id === id ? { ...nom, status: newStatus } : nom
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this nomination?')) {
      setNominations(prev => prev.filter(nom => nom.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const categories = [
    'Business & Entrepreneurship',
    'Pharma & Healthcare',
    'Film & Entertainment',
    'Special Recognitions'
  ];

  const stats = {
    total: nominations.length,
    pending: nominations.filter(n => n.status === 'pending').length,
    approved: nominations.filter(n => n.status === 'approved').length,
    rejected: nominations.filter(n => n.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage nominations and awards</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Nominations</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
              </div>
              <Award className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-gray-800">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-gray-800">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search nominations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Nominations List */}
        <div className="space-y-4">
          {filteredNominations.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No nominations found</p>
            </div>
          ) : (
            filteredNominations.map((nomination) => (
              <div key={nomination.id} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {nomination.candidateName}
                    </h3>
                    <p className="text-gray-600">{nomination.organization}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {nomination.email} • {nomination.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(nomination.status)}
                    <button
                      onClick={() => handleDelete(nomination.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Category:</p>
                  <p className="text-gray-600">{nomination.category}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Achievements:</p>
                  <p className="text-gray-600">{nomination.achievements}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(nomination.submittedDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    {nomination.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(nomination.id, 'approved')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(nomination.id, 'rejected')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

