<template>
  <v-container fluid class="wrapper">

    <v-card class="main-card" v-if="status === 'home'">
      <v-card-title >Daily</v-card-title>
      <v-card-subtitle> Embed Daily Prebuilt </v-card-subtitle>
      <v-divider></v-divider>

      <v-container class="start-call-container">

       <v-row>

         <v-col cols="6">
          <v-row>
            <v-col>
              <v-card elevation="8">
                <v-card-title> Join a room </v-card-title>
                <v-card-subtitle> All you need is a link! </v-card-subtitle>
                <v-card-text>
                  <v-form class="text-center">

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          id="room"
                          type="text"
                          placeholder="Enter room URL..."
                          v-model="roomToJoin.url"
                          pattern="^(https:\/\/)?[\w.-]+(\.(daily\.(co)))+[\/\/]+[\w.-]+$"
                          @input="validateInput"
                          required
                          persistent-hint
                          clearable
                          hint="i.e. https://magic-show.daily.co/magic-room"
                        />
                      </v-col>

                      <v-col cols="5">
                        <v-radio-group v-model="roomToJoin.privacy">
                          <v-radio
                            value="public"
                          >
                            <template v-slot:label>
                              <v-icon left>
                                mdi-lock-open
                              </v-icon>

                              Public: anyone with the link can join
                            </template>
                          </v-radio>

                          <v-radio
                            value="private"
                          >
                            <template v-slot:label>
                              <v-icon left>
                                mdi-lock
                              </v-icon>

                              Private: requires a token to join
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="7">
                        <v-textarea
                          auto-grow
                          rows="1"
                          row-height="15"
                          clearable

                          placeholder="Enter your token for the room"
                          v-model="roomToJoin.token"

                        />
                      </v-col>
                    </v-row>

                    <v-container>
                      <v-btn color="primary" :disabled="! roomToJoin.url" @click="submitJoinRoom" >Join room</v-btn>
                    </v-container>
                    <!--          <v-btn type="submit" :disabled="!validRoomURL">Join room</v-btn>-->
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

           <v-row class="mt-4">
             <v-col>
               <v-card elevation="8">
                 <v-card-title> Create your private room as broadcast! </v-card-title>
                 <v-card-subtitle> Form that allows you to create a private room where just the owner can broadcast </v-card-subtitle>
                 <v-card-text>
                   <v-form class="text-center">

                     <v-row>
                       <v-col cols="12">
                         <v-text-field
                           id="name"
                           type="text"
                           placeholder="Enter name of the room"
                           v-model="privateRoomName"
                           required
                           hint="Room name cannot exceed 41 characters - regexp expects /[^A-Za-z0-9_-]/"
                           persistent-hint
                         />

                       </v-col>

                       <v-col cols="12">
                         <v-text-field
                           v-show="privateRoomUrl"
                           type="text"
                           label="Room url"
                           :value="privateRoomUrl"
                           readonly
                         />
                       </v-col>
                     </v-row>

                     <v-container>
                       <v-alert
                         dense
                         text
                         type="success"
                         v-show="feedbackPrvRoom"
                       >
                         Private room <strong>{{ privateRoomName }}</strong> created with success
                       </v-alert>

                       <v-btn :loading="creatingPrvRoom" color="primary" @click="createPrivateRoom" >Create private room</v-btn>
                     </v-container>

                   </v-form>
                 </v-card-text>
               </v-card>
             </v-col>
           </v-row>

           <v-row class="mt-4">
             <v-col>
               <v-card elevation="8">
                 <v-card-title> Create meeting token access </v-card-title>
                 <v-card-subtitle> Allow access to rooms </v-card-subtitle>
                 <v-card-text>
                   <v-form class="text-center">

                     <v-container>
                       <v-row no-gutters>
                         <v-col cols="12">
                           <v-subheader class="subtitle-1 pl-0"><v-icon left>mdi-account-key</v-icon> Level access:</v-subheader>
                           <v-radio-group v-model="tokenLevelAccess">
                             <v-radio
                               value="admin"
                             >
                               <template v-slot:label>
<!--                                 <v-icon left>-->
<!--                                   mdi-lock-open-->
<!--                                 </v-icon>-->

                                 Administrator: This will give the user associated with this token access to every meeting on your domain.
                               </template>
                             </v-radio>

                             <v-radio
                               value="room"
                             >
                               <template v-slot:label>
<!--                                 <v-icon left>-->
<!--                                   mdi-lock-->
<!--                                 </v-icon>-->

                                 Room: Grant access to the room
                               </template>
                             </v-radio>
                           </v-radio-group>
                         </v-col>

                         <v-col cols="12" v-show="tokenLevelAccess === 'room'">
                           <v-checkbox
                             v-model="isHostOfTokenRoom"
                             label="Host of the room"
                           ></v-checkbox>
                         </v-col>

                         <v-col cols="12" v-show="tokenLevelAccess === 'room'">
                           <v-text-field
                             type="text"
                             label="Room name"
                             v-model="tokenRoomName"
                           />
                         </v-col>
                       </v-row>


                       <v-alert
                         dense
                         text
                         type="success"
                         v-show="feedbackToken"
                       >
                         Token for room <strong>{{ tokenRoomName }}</strong> created with success
                       </v-alert>

                       <v-btn :disabled="tokenLevelAccess === 'room' && !tokenRoomName" :loading="creatingToken" v-if="! token" color="primary" @click="createToken" >Create token</v-btn>

                       <v-text-field
                         v-else
                         type="text"
                         label="Token"
                         :value="token"
                         readonly
                       />

                     </v-container>

                   </v-form>
                 </v-card-text>
               </v-card>
             </v-col>
           </v-row>

         </v-col>

         <v-col cols="6">
           <v-card elevation="8">
             <v-card-title> Create a room</v-card-title>
             <v-card-subtitle> Configure your room to host your meetings </v-card-subtitle>
             <v-card-text>
               <v-form class="text-center">

                 <v-expansion-panels focusable>
                   <v-expansion-panel>
                     <v-expansion-panel-header>
                       <strong>Basic settings</strong>
                     </v-expansion-panel-header>

                     <v-expansion-panel-content>
                       <v-list two-line subheader>

                         <v-list-item>
                         <v-list-item-content>
                           <v-row>
                             <v-col cols="6">
                               <v-list-item-title>
                                 Room name
                               </v-list-item-title>
                               <v-list-item-subtitle>
                                 If left blank, a random room name will be generated. Room name cannot be changed after creation.
                               </v-list-item-subtitle>
                             </v-col>

                             <v-col cols="6">
                               <v-text-field
                                 id="name"
                                 type="text"
                                 placeholder="Enter name of the room"
                                 v-model="room.name"
                                 required
                                 hint="Room name cannot exceed 41 characters - regexp expects /[^A-Za-z0-9_-]/"
                                 persistent-hint
                               />
                             </v-col>
                           </v-row>
                         </v-list-item-content>
                       </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Privacy
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Limit who can access the room. Room owners can always join any room they create.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-radio-group v-model="room.privacy">
                                   <v-radio
                                     value="public"
                                   >
                                     <template v-slot:label>
                                       <v-icon left>
                                         mdi-lock-open
                                       </v-icon>

                                       Public: anyone with the link can join
                                     </template>
                                   </v-radio>

                                   <v-radio
                                     value="private"
                                   >
                                     <template v-slot:label>
                                       <v-icon left>
                                         mdi-lock
                                       </v-icon>

                                       Private: requires a token to join
                                     </template>
                                   </v-radio>
                                 </v-radio-group>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   New Prebuilt UI
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Use the new Prebuilt UI for all of your calls.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_new_call_ui"
                                   :label="room.properties.enable_new_call_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Prejoin
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants can enter their name and configure their camera and mic before joining a call.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_prejoin_ui"
                                   :label="room.properties.enable_prejoin_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Knocking
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   For private rooms, users joining without a token can request access to the room from a meeting owner.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_knocking"
                                   :label="room.properties.enable_knocking ? 'On': 'Off'"
                                   :hint="room.privacy === 'public' ? 'Disabled for public rooms': ''"
                                   persistent-hint
                                   :disabled="room.privacy === 'public'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Cameras on start
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Set whether users join with their cameras on or off. Users can still control their cameras manually.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.start_video_off"
                                   :label="room.properties.start_video_off ? 'Off': 'On'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Microphones on start
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Set whether users join with their microphones on or off. Users can still control their microphones manually.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.start_audio_off"
                                   :label="room.properties.start_audio_off ? 'Off': 'On'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Screen sharing
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants can share their screens during calls.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_screenshare"
                                   :label="room.properties.enable_screenshare ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Text chat
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants can send text chat during calls.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_chat"
                                   :label="room.properties.enable_chat ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   People
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Users can view a list of all participants in the meeting.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_people_ui"
                                   :label="room.properties.enable_people_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Background effects
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants can choose to enable background effects for their local camera feed.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_video_processing_ui"
                                   :label="room.properties.enable_video_processing_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Network
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants can view network stats, like packet loss and bitrate, during their call.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_network_ui"
                                   :label="room.properties.enable_network_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Picture-in-Picture
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Toggle the Picture in Picture feature
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.enable_pip_ui"
                                   :label="room.properties.enable_pip_ui ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Recording
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Enable video call recording for this room. Any participant in the room will be able to start the recording.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-radio-group v-model="room.properties.enable_recording">
                                   <v-radio
                                     :value="null"
                                   >
                                     <template v-slot:label>
                                       <v-icon left>
                                         mdi-movie-open-off
                                       </v-icon>

                                       Off
                                     </template>
                                   </v-radio>

                                   <v-radio
                                     value="local"
                                   >
                                     <template v-slot:label>
                                       <v-icon left>
                                         mdi-laptop
                                       </v-icon>

                                       Local recording
                                     </template>
                                   </v-radio>

                                   <v-radio
                                     value="cloud"
                                   >
                                     <template v-slot:label>
                                       <v-icon left>
                                         mdi-cloud
                                       </v-icon>

                                       Cloud recording
                                     </template>
                                   </v-radio>
                                 </v-radio-group>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Language
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Set the language for this room's video call UI.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-select
                                   v-model="room.properties.lang"
                                   :items="dailyLanguages"
                                 />
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                       </v-list>

                     </v-expansion-panel-content>
                   </v-expansion-panel>


                   <v-expansion-panel>
                     <v-expansion-panel-header>
                       <strong>Advanced settings</strong>
                     </v-expansion-panel-header>

                     <v-expansion-panel-content>
                       <v-list two-line subheader>

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Maximum participants
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Set the maximum number of participants allowed in a room at the same time.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-text-field
                                   type="number"
                                   placeholder="Enter maximum participants"
                                   v-model="room.properties.max_participants"
                                   counter="200"
                                   required
                                 />
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Eject after
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Eject participants this many seconds after they join the meeting.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-select
                                   v-model="room.properties.eject_after_elapsed"
                                   :items="dailyEjectAfterTimes"
                                   placeholder="Select eject after duration"
                                 />
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Owner only broadcast
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Only meeting owners can screen share, record and use their camera/mic.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   v-model="room.properties.owner_only_broadcast"
                                   :label="room.properties.owner_only_broadcast ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Meeting join hook
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Set a URL that will receive a webhook when a user joins a room.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-text-field
                                   type="text"
                                   placeholder="Enter endpoint URL..."
                                   v-model="room.properties.meeting_join_hook"
                                   required
                                 />
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Not before
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants cannot join before this time (UTC).
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">

                                 <v-row>
                                   <v-col cols="6">
                                     <base-date-picker
                                       v-model="nbfDate"
                                       label="Not before date"
                                       icon=""
                                     />
                                   </v-col>
                                   <v-col cols="6">
                                     <base-time-picker
                                       v-model="nbfTime"
                                       icon=""
                                     />
                                   </v-col>
                                 </v-row>

                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Expires
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Participants cannot join after this time (UTC).
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-row>
                                   <v-col cols="6">
                                     <base-date-picker
                                       v-model="expDate"
                                       label="Exp date"
                                       icon=""
                                     />
                                   </v-col>
                                   <v-col cols="6">
                                     <base-time-picker
                                       v-model="expTime"
                                       label="Exp time"
                                       icon=""
                                     />
                                   </v-col>
                                 </v-row>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                         <v-divider  />

                         <v-list-item>
                           <v-list-item-content>
                             <v-row>
                               <v-col cols="6">
                                 <v-list-item-title>
                                   Eject on EXP
                                 </v-list-item-title>
                                 <v-list-item-subtitle>
                                   Eject participants when the EXP (Expires) time is reached.
                                 </v-list-item-subtitle>
                               </v-col>

                               <v-col cols="6">
                                 <v-switch
                                   dense
                                   color="primary"
                                   :disabled="!expUnixTime"
                                   v-model="room.properties.eject_at_room_exp"
                                   :label="room.properties.eject_at_room_exp ? 'On': 'Off'"
                                 ></v-switch>
                               </v-col>
                             </v-row>
                           </v-list-item-content>
                         </v-list-item>

                       </v-list>

                     </v-expansion-panel-content>
                   </v-expansion-panel>
                 </v-expansion-panels>


                 <v-container>
                   <v-alert
                     dense
                     text
                     type="success"
                     v-show="feedbackAdvRoom"
                   >
                     Room <strong>{{ room.name }}</strong> created with success
                   </v-alert>

                   <v-btn :loading="creatingAdvRoom" color="primary" @click="createAdvancedRoom" >
                     Create room
                   </v-btn>
                 </v-container>

               </v-form>

               <v-alert v-if="roomError" class="mt-4" type="error">
                 Room could not be created: <br>
                 <p>
                   {{ roomErrorMsg }}
                 </p>
               </v-alert>

             </v-card-text>
           </v-card>
         </v-col>

       </v-row>


        <v-divider class="mt-8"></v-divider>
        <v-divider class="mb-8"></v-divider>

        <v-row>
          <v-col>
            <v-card elevation="8">
              <v-card-title> List Meeting token access </v-card-title>
              <v-card-subtitle> Allow access to rooms </v-card-subtitle>
              <v-card-text>
                <v-card-subtitle v-show="! tokens.length">
                  No access tokens found.
                </v-card-subtitle>

                <v-expansion-panels v-show="tokens.length">
                  <v-expansion-panel
                    v-for="(token, i) in tokens"
                    :key="i"
                  >
                    <v-expansion-panel-header>
                      <v-row no-gutters>
                        <v-col >
                          {{ token.isAdmin ? 'Administrator': token.isOwner? 'Host': 'Participant' }}
                        </v-col>

                        <v-col
                          class="text--secondary"
                        >
                          {{ token.roomName ? `Room: ${token.roomName}`: 'All rooms' }}
                        </v-col>

                        <v-col
                          class="text--secondary"
                        >
                          {{ token.isOwner && token.isAdmin ? 'Domain Owner': token.isOwner ? 'Room Owner': '-' }}
                        </v-col>
                      </v-row>

                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ token.token }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col>
            <v-card elevation="8">
              <v-card-title> List Rooms </v-card-title>
              <v-card-subtitle> View all rooms under the domain </v-card-subtitle>
              <v-card-text>
                <v-card-subtitle v-show="! rooms.length">
                  No rooms found.
                </v-card-subtitle>

                <v-expansion-panels v-show="rooms.length">
                  <v-expansion-panel
                    v-for="(room, i) in rooms"
                    :key="i"
                  >
                    <v-expansion-panel-header>
                      <strong>{{ room.name }}</strong>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row no-gutters>
                        <pre>
                          {{ room }}
                        </pre>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col>
            <v-card elevation="8">
              <v-card-title>
                <v-row>
                  <v-col cols="8">
                    List Meetings for room name: {{ `${searchMeetingsForRoom ? `&nbsp; ${searchMeetingsForRoom}` : '________ ?'}` }}
                  </v-col>
                  <v-col cols="4">
                    <input
                      placeholder="Enter room name to list meetings..."
                      v-model.lazy.trim="searchMeetingsForRoom"
                      class="v-input pa-2 py-1"
                      :class="$vuetify.theme.isDark ? 'theme--dark': 'theme--light'"
                      style="width: 100%;border-bottom: 1px solid;"
                    />
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle> View all meeting for specific room </v-card-subtitle>
              <v-card-text>
                <v-card-subtitle v-show="! meetings.length">
                  No meetings found{{ searchMeetingsForRoom ? `for room: ${searchMeetingsForRoom}`: '' }}.
                </v-card-subtitle>

                <v-expansion-panels v-show="meetings.length">
                  <v-expansion-panel
                    v-for="(meeting, i) in meetings"
                    :key="i"
                  >
                    <v-expansion-panel-header>

                      <v-row no-gutters>
                        <v-col cols="auto" class="align-self-center">
                          <v-chip
                            class="ma-2"
                            :color="meeting.ongoing ? 'green': 'red'"
                            text-color="white"
                          >
                            <v-avatar
                              left
                              :class="`${meeting.ongoing ? 'green': 'red'} darken-4`"
                            >
                              {{ meeting.participants.length }}
                            </v-avatar>

                            {{ meeting.ongoing ? 'In Progress': 'Not in Progress' }}
                          </v-chip>
                        </v-col>

                        <v-col cols="8">
                          <v-card-subtitle class="subtitle-1">
                            Meeting ID: <strong>{{ meeting.id }}</strong>
                          </v-card-subtitle>
                        </v-col>

                        <v-col cols="auto">
                          <v-card-subtitle class="subtitle-1">
                            Participants: <strong>{{ meeting.participants.length }}</strong>
                          </v-card-subtitle>
                        </v-col>
                      </v-row>

                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <pre>
                        {{ meeting }}
                      </pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-card>

    <v-container class="call-container" :class="{ hidden: status === 'home' }">
      <v-row>
        <!-- When using sideControls panel @ADD: :cols="status === 'call' ? 9: 12"  -->
        <v-col :cols="status === 'call' ? 9: 12">
          <!-- The Daily Prebuilt iframe is embedded in the div below using the ref -->
          <div id="call" ref="callRef"></div>
        </v-col>


        <v-col cols="3" v-if="status === 'call'">

          <v-btn @click="startTranscription" :disabled="isTranscribing">
            {{ isTranscribing ? 'Transcribing' : 'Start transcribing' }}
          </v-btn>

          <v-btn @click="stopTranscription" :disabled="!isTranscribing">
            Stop transcribing
          </v-btn>

          <v-app-bar
            v-for="p in participants"
            :key="p.session_id"
            class="mb-2 ml-1"
            color="rgba(0,0,0,0)"
            flat
          >
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="16"
              offset-y="9"
            >
              <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>

            <v-list-item class="pa-0">
              <v-list-item-content>
                <div style="word-break: break-word">
                  {{ p['user_name'] }}
                </div>
                <v-list-item-subtitle style="margin-top: .25rem">
                  {{ 'name' }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-app-bar>

          <!-- Only show the control panel if a call is on -->
          <daily-controls-iframe
            :roomUrl="roomToJoin.url"
            :callFrame="callFrame"
            :transcriptionHistory="transcriptionHistory"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>

</template>

<script>
import DailyIframe from "@daily-co/daily-js";
import {mapGetters} from "vuex";
import daily from "@daily-co/daily-js";

const IFRAME_OPTIONS = {
  height: "100%", //"auto"
  width: "100%",
  // aspectRatio: 16 / 9,
  // minWidth: "400px",
  // maxWidth: "100%", //maxWidth: "920px",
  // border: "1px solid var(--base-primary)",
  // borderRadius: "4px",
};

export default {
  name: 'Daily',
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      callObject: null,
      transcriptionHistory: [],
      isTranscribing: false,

      roomToJoin: {
        url: "https://magic-show.daily.co/transcript2",
        privacy: "public",
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1ZCI6ImN1c3RvbWVycy51Y2FzLmFiY2I1NDFmLWQ3NzctNDgzOC05ZWMyLTExYmY1YzNlYjk1NSIsIm8iOnRydWUsInIiOiJ0cmFuc2NyaXB0MiIsImQiOiJjMzNlNWE3Zi02YmQxLTRjMjMtYjk1Mi0zMDZjYmQ3NTc1MjIiLCJpYXQiOjE2NTA0NDgyMDR9.7y6DJGCUiDnXT5H11Q3bGWZd01Q5kXPpsJRvuT5l-08'
      },

      room: {
        name: "",
        privacy: "public",
        properties: {
          enable_new_call_ui: true, // They recommend to pass false for old/existing Customers.
          enable_prejoin_ui: true,
          enable_knocking: false,
          start_video_off: true,
          start_audio_off: true,
          enable_screenshare: true,
          enable_chat: false,
          enable_people_ui: true,
          enable_video_processing_ui: false,
          enable_network_ui: false,
          enable_pip_ui: false,
          lang: 'en',

          owner_only_broadcast: false,
          eject_at_room_exp: false, // should just be true when exp unix time is present.

          enable_recording: null,
        }
      },

      dailyLanguages: [
        {
          text: 'German',
          value: 'de'
        },
        {
          text: 'English',
          value: 'en'
        },
        {
          text: 'Spanish',
          value: 'es'
        },
        {
          text: 'Finnish',
          value: 'fi'
        },
        {
          text: 'French',
          value: 'fr'
        },
        {
          text: 'Italian',
          value: 'it'
        },
        {
          text: 'Japanese',
          value: 'jp'
        },{
          text: 'Norwegian',
          value: 'no'
        },
        {
          text: 'Portuguese',
          value: 'pt'
        },
        {
          text: 'Polish',
          value: 'pl'
        },
        {
          text: 'Georgian',
          value: 'ka'
        },
        {
          text: 'Dutch',
          value: 'nl'
        },
        {
          text: 'Russian',
          value: 'ru'
        },
        {
          text: 'Swedish',
          value: 'sv'
        },
        {
          text: 'Turkish',
          value: 'tr'
        }
      ],

      dailyEjectAfterTimes: [
        {
          text: '15 min',
          value: 900
        },
        {
          text: '30 min',
          value: 1800
        },
        {
          text: '1 Hr',
          value: 3600
        },
        {
          text: '2 Hr',
          value: 7200
        },
        {
          text: '4 Hr',
          value: 14400
        }
      ],

      nbfDate: undefined,
      expDate: undefined,
      nbfTime: undefined,
      expTime: undefined,

      // Meeting Tokens
      token: null,
      tokenLevelAccess: 'room',
      isHostOfTokenRoom: false,
      tokenRoomName: '',

      tokens: [], // array of tokens retrieved from LocalStorage.
      rooms: [],
      meetings: [],
      searchMeetingsForRoom: '',

      privateRoomUrl: '',
      privateRoomName: '',

      creatingAdvRoom: false,
      creatingPrvRoom: false,
      creatingToken: false,

      feedbackAdvRoom: false,
      feedbackPrvRoom: false,
      feedbackToken: false,

      status: "home",
      callFrame: null,
      validRoomURL: false,
      roomError: false,
      roomErrorMsg: '',

      participants: [],
    };
  },
  mounted() {
    // const option = {
    //   url: this.roomToJoin.url,
    // };

    // // Create instance of Daily call object
    // const co = daily.createCallObject(option);
    // // Assign in data obj for future reference
    // this.callObject = co;
  },

  unmounted() {
    if (!this.callFrame) return;
    // Clean-up event handlers
    this.callFrame

      .off("joined-meeting", this.updateParticipants)
      .off("participant-joined", this.updateParticipants)
      .off("participant-updated", this.updateParticipants)
      .off("participant-left", this.updateParticipants)

  },

  watch: {
    async searchMeetingsForRoom(room){
      if ( room && room !== '')
        this.meetings = await this.listMeetings(room);
    },

    '$vuetify.theme.isDark': {
      immediate: true,
      handler: function (isDark) {
        const mode = isDark ? 'dark': 'light'

        const defaults = this.$vuetify.theme.themes[mode];
        console.log( defaults.accent, "THEME")


        if (this.callFrame) {
          this.callFrame.setTheme({
            colors: {
              accent: defaults.primary,
              accentText: '#FFFFFF',

              background: '#000', // defaults.secondary, // main area background - outer (footer(controls)/header) | White or Black depending of contrast.

              backgroundAccent: defaults.primary, // hover icons/actions
              baseText: '#FFF', // colorText hover icons/actions | White or Black depending of contrast.


              // border: '#ffff00', // inner border - Where users displays with its own controls.
              mainAreaBgAccent: defaults.accent, // backgroundColor when user has not videoOn
              mainAreaText: '#FFF', // colorText when user has not videoOn | White or Black depending of contrast.

              mainAreaBg: '#000000', // backgroundColor behind participants and call
              // supportiveText: defaults.primary, // colorText used in ParticipantList header and as descriptive text to display relant info
            },
          });
        }

      }
    },
  },
  async created(){
    // Enable transcriptions Domain Level
    // await this.$repository.daily.enableTranscription() //@todo: enable in domain level just once.

    this.rooms = await this.listRooms()

    this.tokens = JSON.parse(localStorage.getItem('meet_tokens') || JSON.stringify([]))
  },
  computed: {
    ...mapGetters({
      me: 'me/me'
    }),

    runningLocally() {
      return window?.location?.origin.includes("localhost");
    },

    nbfUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.nbfDate && this.nbfTime ? this.nbfDate + 'T' + this.nbfTime + ':00': null;

      return new Date(dateTime).getUnixTime()
    },

    expUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.expDate && this.expTime ? this.expDate + 'T' + this.expTime + ':00': null;
      return new Date(dateTime).getUnixTime()
    },
  },
  methods: {
    /** Function that creates a new room.
     * ! - Meaning could be differences between the Daily Prebuilt and Daily call object. As well could be deprecated soon.
     * !! - Meaning could have limitations and might need to UPGRADE OR SCALE PLAN
     * Ref: https://docs.daily.co/reference/rest-api/rooms/create-room
     *
     *  name: The room name. Default: randomly generated string
     *  privacy: Determines who can access the room. (Options: "public","private"). | Default: Public
     *
     *  properties:
     *   nbf: "Not before". Unix timestamp (seconds since the epoch.) Users cannot join a meeting in this room before this time. | Default: <not set>
     *   exp:"Expires". This is a unix timestamp (seconds since the epoch.) Users cannot join a meeting in this room after this time. | Default: <not set>
     *
     * ! autojoin:
     *  - Skip the initial meeting join page and go straight into the call.
     *  - Default: true. **Consider to enable_prejoin_ui to false**
     *  - ❗️ autojoin will soon be deprecated
     *
     * ! enable_new_call_ui:
     *  - Sets whether the room uses Daily Prebuilt or the previous video chat interface.
     *  - Default: false for existing customers; true for new signups
     *  - ⚠️ This property will eventually be deprecated, once Daily Prebuilt is the only available interface experience.
     *
     * ! enable_people_ui:
     *  - Determines if Daily Prebuilt displays the People UI. When set to true, a People button in the call tray reveals a People tab
     *  in the call sidebar. When enable_people_ui is set to false, the button and tab are hidden.
     *  - ⚠️ Has no effect on custom calls built on the Daily call object.
     *  - ⚠️ If owner_only_broadcast is set to true and enable_chat is set to false, then the People UI is already hidden for participants.
     *  - Default: NULL
     *
     * ! enable_pip_ui:
     *  - Sets whether the room can use Daily Prebuilt's Picture in Picture controls. When set to true, an additional button will be
     *  available in Daily Prebuilt's UI to toggle the Picture in Picture feature.
     * - ⚠️ This flag only applies to Daily Prebuilt. It has no effect when building custom video applications with the Daily call object.
     * - ⚠️ This property is in beta as of daily-js 0.24.0.
     * - Default: false
     *
     * ! enable_prejoin_ui:
     * - Determines whether participants enter a waiting room with a camera, mic, and browser check before joining a call.
     * - ⚠️ You must be using Daily Prebuilt to use enable_prejoin_ui.
     * - Default: NULL
     * - If you want to have autojoin true then you must pass enable_prejoin_ui as false
     *
     * ! enable_network_ui:
     * - Determines whether the network button, and the network panel it reveals on click, appears in this room.
     * - ⚠️ You must be using Daily Prebuilt to use enable_network_ui.
     * - Default: false
     *
     * enable_knocking:
     *  - Turns on a lobby experience for private rooms. A participant without a corresponding meeting token
     *  can request to be admitted to the meeting with a "knock", and wait for the meeting owner to admit them.
     * - Requires the signaling_impl room or domain property set to "ws".
     * - Default: false
     *
     * enable_screenshare: | Default: true
     *
     * ! enable_video_processing_ui:
     * - Determines whether Daily Prebuilt displays background blur controls. When set to true, a participant can enable blur during a Daily Prebuilt call.
     * - ⚠️ This flag only applies to Daily Prebuilt. It has no effect when building custom video applications with the Daily call object.
     * - Default: true
     *
     * enable_chat: This property is one of multiple ways to add chat to Daily video calls. | Default: false
     * start_video_off: When a participant first joins a meeting in a room, keep their camera off. | Default: false
     * start_audio_off: When a participant first joins a meeting in a room, keep their microphone muted. | Default: false
     *
     * ! owner_only_broadcast: In Daily Prebuilt, only the meeting owners will be able to turn on camera, unmute mic, and share screen | Default: false
     *
     * eject_at_room_exp: If there's a meeting going on at room exp time, end the meeting by kicking everyone out.
     * This behavior can be overridden by setting eject properties of a meeting token. | Default: false
     *
     * eject_after_elapsed: Eject a meeting participant this many seconds [INTEGER VALUE] after the participant joins the meeting.
     * You can use this is a default length limit to prevent long meetings. This can be overridden by setting eject properties of a meeting token.
     *
     * lang:
     * - The default language of the Daily prebuilt video call UI, for this room.
     * - Setting the language at the room level will override any domain-level language settings you have.
     * - Read more about changing UI language settings: https://help.daily.co/en/articles/4579930-changing-the-language-setting-of-the-prebuilt-ui
     * - *Norwegian "no" and Russian "ru" are only available in the new Daily Prebuilt.
     * - Options: "de","en","es","fi","fr","it","jp","ka","nl","no","pt","pl","ru","sv","tr","user"
     * - Default: "en"
     *
     * meeting_join_hook:
     * - Sets a URL that will receive a webhook when a user joins a room.
     * - Default is NULL.
     * - Character limit for webhook URL is 255.
     * - Default: NULL
     * - [Configuring a webhook to send notifications when someone joins your video calls]: https://www.daily.co/blog/configure-a-webhook-to-send-notifications-when-someone-joins-your-video-calls/
     *
     * signaling_imp: Sets the signaling type. Options: "ws" | Default: "ws"
     *
     * geo:
     * - Daily calls use signaling servers to manage all of the participants in a given call session. In an SFU/server mode call, that same server will also send and receive all the audio and video from each participant. In a peer-to-peer call, each participant sends media directly to and from each other peer, but a signaling server still manages call state.
     * Daily runs servers in several different AWS regions to minimize latency for users around the world. The job of 'picking' a call server is handled when the first participant joins a room. Their browser connects to a call server using Amazon's Route 53 DNS resolution, which chooses a server in the region closest to them.
     * This isn't always optimal. For example, if one person joins in London, and then ten more people join from Cape Town, the call will still be hosted out of eu-west-2 . The majority of the participants will have higher latency to the server than if one of them had joined first and the call was being hosted in af-south-1. In cases like this, you may want to configure your domain (or a specific room) to always choose a call server in a specific AWS region.
     * - Available regions:
     * - "af-south-1" (Cape Town)
     * - "ap-northeast-2" (Seoul)
     * - "ap-southeast-1" (Singapore)
     * - "ap-southeast-2" (Sydney)
     * - "ap-south-1" (Mumbai)
     * - "eu-central-1" (Frankfurt)
     * - "eu-west-2" (London)
     * - "sa-east-1" (São Paulo)
     * - "us-east-1" (N. Virginia)
     * - "us-west-2" (Oregon)
     * - Default: NULL
     *
     *
     * !! SCALE PLAN ONLY !!
     * !! max_participants: How many people are allowed in a room at the same time. | Default: 200
     *
     * !! enable_recording:
     * Recording docs: https://docs.daily.co/reference/rest-api/rooms/create-room#enable_recording && https://docs.daily.co/reference/rest-api/recordings
     * - Options: "cloud","local","rtp-tracks","output-byte-stream","<not set>"
     * - Default: <not set>
     *
     * @param options {{
     * name: string,
     * privacy: string,
     * properties: {
     *
     * nbf: number | undefined,
     * exp: number | undefined,
     * max_participants: number | undefined,
     * enable_prejoin_ui: boolean | undefined,
     * enable_new_call_ui: boolean | undefined,
     * enable_people_ui: boolean | undefined,
     * enable_pip_ui: boolean | undefined,
     * enable_network_ui: boolean | undefined,
     * enable_knocking: boolean | undefined,
     * enable_screenshare: boolean | undefined,
     * enable_video_processing_ui: boolean | undefined,
     * enable_chat: boolean | undefined,
     * start_video_off: boolean | undefined,
     * start_audio_off: boolean | undefined,
     *
     * owner_only_broadcast: boolean | undefined,
     * enable_recording: string | undefined,
     *
     * eject_at_room_exp: boolean | undefined,
     * eject_after_elapsed: number | undefined,
     * lang: string | undefined,
     * meeting_join_hook: string | undefined,
     * signaling_imp: string | undefined,
     * geo: string | undefined,
     * }
     *
     * }}
     */
    async createRoom(options){
      try {
        return await this.$api().daily.createRoom(options)

      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      }
    },

    async createAdvancedRoom() {
      console.log(this.room.properties, "this.room.properties")
     const opt = {
        name: this.room.name,
        privacy: this.room.privacy,
        properties: {
          ...this.room.properties,
        }
      }

      if (this.nbfUnixTime) {
        opt.properties.nbf = this.nbfUnixTime
      }

      if (this.expUnixTime) {
        opt.properties.exp = this.expUnixTime
      }

      this.creatingAdvRoom = true
      const room = await this.createRoom(opt)
      this.creatingAdvRoom = false
      this.feedbackAdvRoom = true

      this.roomToJoin.url = room.url;

      // this.joinRoom(room.url); // Join after create room
    },

    async createPrivateRoom() {
      const opt = {
        name: this.privateRoomName,
        privacy: 'private',
        properties: {
          owner_only_broadcast: true
        }
      }

      this.creatingPrvRoom = true
      const room = await this.createRoom(opt)
      this.creatingPrvRoom = false
      this.feedbackPrvRoom = true

      this.roomToJoin.url = room.url;
      this.privateRoomUrl = room.url;
    },

    /**
     * Create a Meeting Token access
     * @param options
     * @returns {Promise<*>}
     */
    async createMeetingToken(options){
      try {
        return await this.$api().daily.createMeetingToken(options)

      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      }
    },

    /**
     * List all rooms
     * @returns {Promise<*>}
     */
    async listRooms(){
      try {
        const { data } = await this.$api().daily.listRooms()
        return data

      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      }
    },

    /**
     * List All meetings By RoomName
     * @returns {Promise<*>}
     */
    async listMeetings(roomName){
      try {
        const { data } = await this.$api().daily.listMeetings(roomName)
        return data

      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      }
    },

    async createToken() {
      const opt = {
        properties: {
          // "user_name": "user123", // from the profile or input textField. (i.e. Administrator)
          "user_id": this.me.profileId,
        }
      }

      if(this.tokenLevelAccess === 'admin' || this.isHostOfTokenRoom) {
        opt.properties["is_owner"] = true
      }

      if(this.tokenRoomName) {
        opt.properties["room_name"] = this.tokenRoomName
      }

      this.creatingToken = true
      const res = await this.createMeetingToken(opt)
      this.creatingToken = false
      this.feedbackToken = true

      this.token = res.token;

      // Store token in LS
      let meetTokens = JSON.parse(localStorage.getItem('meet_tokens') || JSON.stringify([]))

      meetTokens.push({
        isAdmin: this.tokenLevelAccess === 'admin',
        isOwner: opt.properties["is_owner"] || false,
        roomName: opt.properties["room_name"] || '',
        token: res.token
      })

      localStorage.setItem('meet_tokens', JSON.stringify(meetTokens))

      this.tokens = meetTokens
    },

    // Daily callframe created and joined below
    joinRoom(url, token = '') {
      if (this.callFrame) {
        this.callFrame.destroy();
      }

      // Daily event callbacks
      const logEvent = (ev) => console.log(ev);
      const goToLobby = () => (this.status = "lobby");

      const goToCall = () => {
        this.status = "call"
      }


      const leaveCall = () => {
        if (this.callFrame) {
          this.status = "home";
          this.callFrame.destroy();
        }
      };

      const mode = this.$vuetify.theme.isDark ? 'dark': 'light'
      const defaults = this.$vuetify.theme.themes[mode];

      // DailyIframe container element
      const callWrapper = this.$refs.callRef;

      // Create Daily call
      const callFrame = DailyIframe.createFrame(callWrapper, {
        iframeStyle: IFRAME_OPTIONS,

        // other config...
        showLeaveButton: true,
        showFullscreenButton: true,

        activeSpeakerMode: true,
        //lang: 'en', either or we use the language from roomLang or pass to the frame by single user.
        userName: this.me.profileId,


        theme: {
          colors: {
            accent: defaults.primary,
            accentText: '#FFFFFF',

            background: '#000', // defaults.secondary, // main area background - outer (footer(controls)/header) | White or Black depending of contrast.

            backgroundAccent: defaults.primary, // hover icons/actions
            baseText: '#FFF', // colorText hover icons/actions | White or Black depending of contrast.


            // border: '#ffff00', // inner border - Where users displays with its own controls.
            mainAreaBgAccent: defaults.accent, // backgroundColor when user has not videoOn
            mainAreaText: '#FFF', // colorText when user has not videoOn | White or Black depending of contrast.

            mainAreaBg: '#000000', // backgroundColor behind participants and call
            // supportiveText: defaults.primary, // colorText used in ParticipantList header and as descriptive text to display relant info
          },
        },


      });
      this.callFrame = callFrame;



      // Add event listeners and join call
      callFrame
        .on("loaded", logEvent)
        .on("started-camera", logEvent)
        .on("camera-error", logEvent)
        .on("joining-meeting", goToLobby)
        .on("left-meeting", leaveCall)

        //@TODO: WIP...
        .on("joined-meeting", () => {
          this.updateParticipants()

          goToCall()
        })
        .on("participant-joined", this.updateParticipants)
        .on("participant-updated", this.updateParticipants)
        .on("participant-left", this.updateParticipants)

        .on('transcription-started', this.transcriptionStarted)
        .on('transcription-stopped', this.transcriptionStopped)
        .on('transcription-error', this.transcriptionError)
        .on('app-message', this.transcriptionNewMessage)


      callFrame.join({
        url,
        showFullscreenButton: true,

        token
      });
    },

    submitJoinRoom(e) {
      e.preventDefault();
      this.joinRoom(this.roomToJoin.url, this.roomToJoin.token);
    },
    validateInput(e) {
      this.validRoomURL = !!this.roomToJoin.url //&& e.target.checkValidity();
    },

    updateParticipants(e) {
      console.log("[EVENT] ", e);
      if (!this.callFrame) return;

      const p = this.callFrame.participants();
      this.participants = Object.values(p);
      console.log(this.participants, "participants")

    },

    /**
     * Transcription can be just used if user is owner of the room.
     * @returns {Promise<void>}
     */
    async startTranscription() {
      await this.callFrame.startTranscription();
    },

    async stopTranscription() {
      await this.callFrame.stopTranscription();
    },

    transcriptionStarted() {
      console.log('💬 Transcription started');
      this.isTranscribing = true
    },

    transcriptionStopped() {
      console.log('💬 Transcription stopped');
      this.isTranscribing = false
    },

    transcriptionError(err) {
      console.log('❗ Transcription error!', err);
      this.isTranscribing = false
    },

    transcriptionNewMessage(msg) {
      // Collect only transcription messages, and gather enough
      // words to be able to post messages at sentence intervals
      if (msg.fromId === 'transcription' && msg.data?.is_final) {
        const participants = this.callFrame.participants()

        // Get the sender's current display name or the local name
        const sender = msg.data?.session_id !== participants.local?.session_id
          ? participants[msg.data.session_id].user_name
          : participants.local.user_name;


        console.log("trans msg", { sender, message: msg.data.text })

        this.transcriptionHistory.push({ sender, message: msg.data.text })
      }

    }
  },
}
</script>

<!--<style>-->
<!--:root {-->
<!--  &#45;&#45;grey-lightest: #f7f9fa;-->
<!--  &#45;&#45;white: #ffffff;-->
<!--  &#45;&#45;grey: #c8d1dc;-->
<!--  &#45;&#45;dark-grey: #6b7785;-->
<!--  &#45;&#45;dark-blue: #1f2d3d;-->
<!--  &#45;&#45;dark-blue-border: #2b3f56;-->
<!--  &#45;&#45;teal: #1bebb9;-->
<!--  &#45;&#45;red-dark: #bb0c0c;-->

<!--}-->
<!--</style>-->

<style lang="scss" scoped>
.wrapper {
  height: 100%;

  & .main-card {
    height: 100%;
  }

}

.v-list-item__title, .v-list-item__subtitle {
 text-overflow: unset;
 white-space: unset;
}

.call-container {
  display: flex;
  max-width: 100%;
  height: 100%;
  margin: auto;
  flex: 1;
  flex-wrap: wrap;
}
.call-container.hidden {
  display: none;
}
#call {
  flex: 1;
  height: 100%;
}

</style>
