import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import {Notification} from '~/models/notification'

@Module({
  name: 'notification',
  stateFactory: true,
  namespaced: true,
})
export default class NotificationStore extends VuexModule {
  notification: Notification = <Notification>{};

  @Mutation
  sendNotification(notification : Notification) {
    this.notification = notification   
  }
}
