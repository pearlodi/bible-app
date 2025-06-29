import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@/components/ui/tabs";
  import { useSearchParams, useNavigate } from "react-router-dom";
  import { allPlans, planTypeLabels } from "@/data/plans";
  import { usePlan } from "@/hooks/usePlan";
  
  export default function PlanPickerPage() {
    const { selectPlan, selectedPlans, removePlan } = usePlan();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
  
    const planTypes = Object.keys(planTypeLabels); // e.g., ["one-week", "one-month"]
    const activeTab = searchParams.get("type") || planTypes[0];
  
    const groupedPlans = allPlans.reduce<Record<string, typeof allPlans>>(
      (acc, plan) => {
        if (!acc[plan.type]) acc[plan.type] = [];
        acc[plan.type].push(plan);
        return acc;
      },
      {}
    );
  
    const handleTabChange = (value: string) => {
      setSearchParams({ type: value });
    };
  
    const handlePick = (id: string) => {
      selectPlan(id);
      navigate(`/plans/${id}`);
    };
  
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4">📚 Choose a Reading Plan</h2>
  
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start mb-4 gap-2 flex-wrap">
            {planTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {planTypeLabels[type]}
              </TabsTrigger>
            ))}
          </TabsList>
  
          {planTypes.map((type) => (
            <TabsContent key={type} value={type} className="space-y-3">
              {groupedPlans[type]?.map((plan) => {
                const isActive = selectedPlans.some((p) => p.id === plan.id);
  
                return (
                  <div
                    key={plan.id}
                    className={`w-full p-4 rounded shadow transition cursor-pointer
                      ${isActive ? "bg-green-100 border border-green-500" : "bg-gray-100 hover:bg-gray-200"}
                    `}
                    onClick={() => handlePick(plan.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                      {isActive ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent navigation
                            removePlan(plan.id);
                          }}
                          className="text-red-600 text-sm hover:underline"
                        >
                          Stop
                        </button>
                      ) : (
                        <span className="text-blue-600 text-sm font-medium">Start</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }
  