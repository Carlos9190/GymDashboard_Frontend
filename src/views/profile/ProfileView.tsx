import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/LoadingSpinner";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfileView() {
    const { data, isLoading } = useAuth();

    if (isLoading) return <Spinner />;
    if (data) return <ProfileForm data={data} />;
}
