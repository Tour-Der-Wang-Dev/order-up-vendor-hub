
import { VendorProfileForm } from "@/components/profile/VendorProfileForm";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Restaurant Profile</h2>
      <p className="text-gray-500">
        Manage your restaurant information displayed to customers.
      </p>
      
      <VendorProfileForm />
    </div>
  );
};

export default Profile;
