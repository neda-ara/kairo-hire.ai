"use client";

import { workflow, WorkflowItem } from "@/lib/data/workflow";

export const Workflow = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background px-4 sm:px-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Workflow</h2>
          <p className="text-muted-foreground">From Signup To Success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {workflow.map((item: WorkflowItem, idx: number) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 aspect-square rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
