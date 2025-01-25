import { Container } from "inversify";
import controllerContainer from "./controllerContainer";
import repoContainer from "./repoContainer";

const appContainer = new Container();

appContainer.load(controllerContainer, repoContainer);

export default appContainer;
