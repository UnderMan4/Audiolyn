import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/components/language-select";
import {
   Button,
   Card,
   CardContent,
   CardFooter,
   Typography,
} from "@/components/ui";
import { Wizard } from "@/routes/wizard";

export namespace WelcomeCard {
   export type Props = Wizard.CardProps;
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
            <LanguageSelect />
            <Button onClick={nextStep}>
               {t("wizard.welcome.start")} <ArrowRight />
            </Button>
         </CardFooter>
      </Card>
   );
};
