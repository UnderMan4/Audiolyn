import { exists, mkdir } from "@tauri-apps/plugin-fs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSettingsStore } from "src/stores/settings-store";

import { LibraryCard, WelcomeCard } from "@/features/wizard/components";

import type { Route } from "./+types/wizard-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export namespace WizardPage {
   export type CardProps = {
      nextStep: () => void;
      previousStep: () => void;

      finish: () => Promise<void>;
   };
}

export default function WizardPage() {
   const [step, setStep] = useState(0);
   const navigate = useNavigate();

   const { setFlag, libraryLocation } = useSettingsStore();
   const cardProps = useMemo<WizardPage.CardProps>(
      () => ({
         nextStep: () => setStep((prev) => prev + 1),
         previousStep: () => setStep((prev) => Math.max(prev - 1, 0)),
         finish: async () => {
            setFlag("isFirstRun", false);
            if (!(await exists(libraryLocation))) {
               await mkdir(libraryLocation, { recursive: true });
            }
            navigate("/");
         },
      }),
      [setStep, libraryLocation, setFlag, navigate]
   );

   return (
      <div className="h-full w-full flex flex-start flex-col items-center justify-center gap-4">
         {step === 0 && <WelcomeCard {...cardProps} />}
         {step === 1 && <LibraryCard {...cardProps} />}
      </div>
   );
}
