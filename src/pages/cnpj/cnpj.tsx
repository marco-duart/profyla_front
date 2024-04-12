//NATIVE
//LIBRARIES
//COMPONENTS
import { useFetchCompanies } from "../../hooks/company/use-fetch-companies";
import { useUserContext } from "../../hooks/use-user-context";
//STYLES
//UTILS

const Cnpj = () => {
  const { token } = useUserContext()

  return <div>CNPJ</div>;
};

export default Cnpj;
