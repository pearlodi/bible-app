// utils/localizer.ts
import { format, parse, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "/Users/mac/Documents/webapps/bible-app/node_modules/date-fns/locale/en-US"
const locales = {
    "en-US": enUS,
  };
  

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});
