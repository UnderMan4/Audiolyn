import * as path from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/plugin-fs";
import { platform } from "@tauri-apps/plugin-os";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
   Typography,
} from "@/components/ui";
import { FileSelect } from "@/components/ui/file-select";
import { REGEX } from "@/constants";
import { useAsyncEffect } from "@/hooks";
import { Wizard } from "@/routes/wizard";
import { useSettingsStore } from "@/stores/settings-store";

import { LibraryMethodSelect } from "./library-method-select";

export namespace LibraryCard {
   export type Props = Wizard.CardProps;
}

const system = platform();

export const LibraryCard = ({ nextStep, previousStep }: LibraryCard.Props) => {
   const { t } = useTranslation();
   const { libraryLocation, setLibraryLocation } = useSettingsStore();

   const [isValidLocation, setIsValidLocation] = useState(false);
   const [isLocationEmpty, setIsLocationEmpty] = useState(true);
   const [pathError, setPathError] = useState<Error | undefined>(undefined);

   useAsyncEffect(async () => {
      try {
         if (libraryLocation) {
            const resolvedPath = await path.resolve(libraryLocation);
            console.log("🚀 ~ useAsyncEffect ~ resolvedPath:", resolvedPath);

            console.log("🚀 ~ useAsyncEffect ~ system:", system);
            if (
               system === "windows" &&
               !REGEX.WINDOWS_PATH.test(resolvedPath.replace(/\\/g, "\\\\"))
            )
               return setIsValidLocation(false);
            console.log("first");
            if (system === "linux" && !REGEX.UNIX_PATH.test(resolvedPath))
               return setIsValidLocation(false);
            console.log("first2");

            setIsValidLocation(true);
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
         setPathError(undefined);
      } catch (error) {
         if (error instanceof Error) {
            setPathError(error);
            console.log("🚀 ~ useAsyncEffect ~ error:", error);
         }
         setIsValidLocation(false);
      }
   }, [libraryLocation, setIsValidLocation]);

   return (
      <Card className="w-full max-w-xl m-4 max-h-full ">
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
            {!isLocationEmpty && (
               <Card variant="warn" type="inner">
                  <CardHeader>
                     <CardTitle>{t("wizard.library.notEmpty.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     {t("wizard.library.notEmpty.description")}
                  </CardContent>
               </Card>
            )}
            {(pathError || !isValidLocation) && (
               <Card variant="error" type="inner">
                  <CardHeader>
                     <CardTitle>{t("wizard.library.error")}</CardTitle>
                  </CardHeader>
               </Card>
            )}
            <LibraryMethodSelect />
            {/* <div className="h-[1000px] w-4 bg-red-500"></div> */}
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
