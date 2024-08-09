/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchIcon from "@mui/icons-material/Search";

import {
  CardHeader,
  Input,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";

const Header = ({
  setStatusTab,
  statusTabs,
  heading,
  headingDetail,
  setSearch,
  StatusTabVal,
}: any) => {
  const handleTabChange = (value: any) => setStatusTab(value);
    console.log(StatusTabVal)
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="  rounded-none"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {heading}
          </Typography>
          {headingDetail && (
            <Typography
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              color="gray"
              className="mt-1 font-normal"
            >
              {headingDetail}
            </Typography>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={StatusTabVal ?? "all"} className="w-full md:w-max">
          <TabsHeader
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {statusTabs?.map(({ title, value }: any) => (
              <Tab
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                onClick={() => handleTabChange(value)}
                key={value}
                value={value}
              >
                &nbsp;&nbsp;{title}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
            icon={<SearchIcon className="h-5 w-5" />}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            crossOrigin=""
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;
