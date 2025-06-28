import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "src/components/language-select";
import { ThemeSelect } from "src/components/theme-select";
import {
   Button,
   Card,
   CardContent,
   CardFooter,
   Typography,
} from "src/components/ui";

import { WizardPage } from "@/app/pages/wizard-page";

export namespace WelcomeCard {
   export type Props = WizardPage.CardProps;
}

export const WelcomeCard = ({ nextStep }: WelcomeCard.Props) => {
   const { t } = useTranslation();
   return (
      <Card className="w-full max-w-xl mx-4" variant="default">
         <CardContent>
            <Typography variant="h1">{t("wizard.welcome.title")}</Typography>
            <Typography className="text-muted-foreground mt-2">
               {t("wizard.welcome.subtitle")}
            </Typography>
         </CardContent>
         <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4">
               <LanguageSelect />
               <ThemeSelect />
            </div>
            <Button onClick={nextStep}>
               {t("wizard.welcome.start")} <ArrowRight />
            </Button>
         </CardFooter>
      </Card>
   );
};
