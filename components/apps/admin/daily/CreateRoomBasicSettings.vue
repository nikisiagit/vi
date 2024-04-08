<template>
  <v-list two-line subheader >

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
            <v-radio-group >
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
              persistent-hint
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
            <v-radio-group>
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

              :items="[]"
            />
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  name: "CreateRoomBasicSettings",

}
</script>
