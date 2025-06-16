import * as path from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/plugin-fs";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
   Button,
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui";
import { FileSelect } from "@/components/ui/file-select";
import { useAsyncEffect } from "@/hooks";
import { Wizard } from "@/routes/wizard";
import { useSettingsStore } from "@/stores/settings-store";

import { LibraryMethodSelect } from "./library-method-select";

export namespace LibraryLocationCard {
   export type Props = Wizard.CardProps;
}

export const LibraryLocationCard = ({
   nextStep,
   previousStep,
}: LibraryLocationCard.Props) => {
   const { t } = useTranslation();
   const { libraryLocation, setLibraryLocation } = useSettingsStore();

   const [isValidLocation, setIsValidLocation] = useState(false);
   const [isLocationEmpty, setIsLocationEmpty] = useState(true);

   useAsyncEffect(async () => {
      try {
         if (libraryLocation) {
            const resolvedPath = await path.resolve(libraryLocation);
            setIsValidLocation(resolvedPath !== "");

            const exists = await fs.exists(resolvedPath);
            if (exists) {
               const content = await fs.readDir(resolvedPath);
               setIsLocationEmpty(content.length === 0);
            } else {
               setIsLocationEmpty(true);
            }
         } else {
            setIsValidLocation(false);
         }
      } catch (error) {
         console.error("Error resolving path:", error);
         setIsValidLocation(false);
      }
   }, [libraryLocation, setIsValidLocation]);

   return (
      <Card className="w-full max-w-xl mx-4">
         <CardHeader>
            <CardTitle>{t("wizard.library.title")}</CardTitle>
            <CardDescription>{t("wizard.library.subtitle")}</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-4">
            <FileSelect
               label={t("wizard.library.selectDirectory")}
               value={libraryLocation}
               onChange={(e) => {
                  setLibraryLocation(e.target.value);
               }}
               options={{
                  directory: true,
                  multiple: false,
                  title: t("wizard.library.selectDirectory"),
               }}
            />
            {!isLocationEmpty && <p>dfsdfgsfsdf</p>}
            <Card variant="error" type="inner">
               <CardHeader>
                  <CardTitle>Directory is not empty</CardTitle>
                  <CardDescription>Select different directory</CardDescription>
               </CardHeader>
               <CardContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita saepe quas fugiat rem iure illo laboriosam facere
                  dolorum ea placeat.
               </CardContent>
            </Card>
            <LibraryMethodSelect />
         </CardContent>
         <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={previousStep}>
               <ArrowLeft />
               {t("wizard.common.back")}
            </Button>
            <Button onClick={nextStep} disabled={!isValidLocation}>
               {t("wizard.common.next")}
               <ArrowRight />
            </Button>
         </CardFooter>
      </Card>
   );
};
