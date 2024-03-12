import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const FAQ = () => {
  const [expanded, setExpanded] = useState<any | false>(false);

  const handleChange =
    (panel: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      console.log(event);
    };
  return (
    <section className="min-h-[100vh] bg-onSecondary flex flex-col py-20 gap-12 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl text-onPrimary font-semibold text-center pt-8">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="w-[90%] md:w-[60%] ">
        {[1, 2, 3, 4].map((item, ind) => (
          <Accordion
            key={ind}
            sx={{ marginBottom: "20px" }}
            expanded={expanded === item}
            onChange={handleChange(item)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h3 className=" text-lg md:text-xl font-semibold text-onPrimary">
                Q:{ind + 1} Why do I partner with AARMA
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-placeHolder font-semibold px-2">
                AARMA helps businesses grow their sales, reach new customers,
                and increase brand awareness online. By partnering with us, you
                can get access to new customers who want to order from
                businesses like yours for delivery and pickup.
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
