import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { toast } from 'react-toastify';
import { Announcement } from '../../interfaces/Announcements';
import CreateAnnouncement from '../../components/admin/createAnnouncement/CreateAnnouncement';
import { getAnnouncements } from '../../api/admin/getAnnouncements';

const AdminAnnouncement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const fetchedAnnouncements = await getAnnouncements();
        
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        toast.error('Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 mt-10">Announcements</h1>
        <CreateAnnouncement />
        
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Existing Announcements</h2>
          {loading ? (
            <p>Loading announcements...</p>
          ) : announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement._id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 mb-2">{announcement.content}</p>
                  <p className="text-sm text-gray-400">Created: {new Date(announcement.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No announcements found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAnnouncement;