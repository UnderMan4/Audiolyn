import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/components/language-select";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";
import { Wizard } from "@/routes/wizard";

export namespace WelcomeCard {
   export type Props = Wizard.CardProps;
}

export const WelcomeCard = ({ nextStep }: WelcomeCard.Props) => {
   const { t } = useTranslation();
   return (
      <Card className="w-full max-w-xl mx-4" variant="default">
         <CardContent>
            <h1>{t("wizard.welcome.title")}</h1>
            <p>{t("wizard.welcome.subtitle")}</p>
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
