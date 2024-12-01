import ServerApiManager from "api/ServerApiManager";
import ApiValidationService from "services/ApiValidationService";
import { ServerProps } from "utils/types/api";

const ApiServer = (function () {
  function init(props: ServerProps) {
    return ServerApiManager.execute(props, "init");
  }

  function metaTags(props: ServerProps) {
    return ServerApiManager.execute(props, "metaTags");
  }

  function serverValidation(props: ServerProps = {}) {
    props.settings = props.settings || {};

    props.settings.url = ApiValidationService.validationURL || "";

    return ServerApiManager.execute(props, "init");
  }

  return { init, metaTags, serverValidation };
})();

export default ApiServer;
