import AppWrapper from "components/AppWrapper/AppWrapper";
import CmsLoginWrapper from "components/CmsLoginWrapper/CmsLoginWrapper";

export default function MainCMSLayout({ children }) {
  return (
    <AppWrapper color="green" className="rtl">
      <CmsLoginWrapper color={"green"}>{children}</CmsLoginWrapper>
    </AppWrapper>
  );
}
