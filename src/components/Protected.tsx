import { useAuth } from "providers";
import { Welcome } from "screens";

interface ProtectedProps {
    children: React.ReactNode;
}

function Protected(props: ProtectedProps) {
    const { user } = useAuth();
    const allowed = !!user?.uid;

    if (!allowed) return <Welcome />;

    return <>{props.children}</>;
}

export { Protected };
export type { ProtectedProps };
export default Protected;
