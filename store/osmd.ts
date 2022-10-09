import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'osmd',
  stateFactory: true,
  namespaced: true,
})
export default class OSMDStore extends VuexModule {
    needsUpdate:boolean =  false;

    @Mutation
    setNeedsUpdate(needsUpdate: boolean) {
        this.needsUpdate = needsUpdate;
    }
}
