import { useNavigate } from "react-router-dom";
import { Button } from "../ui/mainUi/moving-border";

export function MovingBorderDemo() {
  const navigate = useNavigate()
  const handlePortalClick = () => {
    navigate('/Portals');
  };

  return (
    <div className="ml-4 md:ml-20 lg:ml-40 xl:ml-8 mt-5">
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={handlePortalClick}
      >
        Student/Teacher Portals
      </Button>
    </div>
  );
}
