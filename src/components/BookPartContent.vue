<template>
  <v-card class="pa-3">
    <div>
      <div class="display-1">{{ part.bookTitle }}</div>
      <div class="headline">{{ part.partTitle }}</div>
    </div>
    <div>
      <div class="text-xs-center mt-2 mb-2">
        <youtube
        :video-id="part.youtube_id"
        :player-width='playerWidth'
        :player-height='playerHeight'
        ></youtube>
      </div>
      <div class="mt-2">
        <v-slider
        v-model="fontSize"
        :label="`Font size (${fontSize})`"
        step="1" max="30" min="10" tick-size="5"
        ></v-slider>
        <v-tabs v-model="tabMod" fixed-tabs >
          <v-tab :key="'england'" ripple>
            Text with tips
          </v-tab>
          <v-tab :key="'sidebyside'" ripple>
            Parallel
          </v-tab>
          <v-tab-item :key="'sidebyside'">
            <div v-for="(paragraph, i) in part.content" :key="`part${i}`">
              <span
              v-for="(sectence, j) in paragraph.sectences"
              :key="`part${i}sen${j}`"
              :style="textStyle"
              >
                <span>{{sectence.originText}}</span>
                <v-icon @click="toggleVisibility(i, j)" size="textStyle">help</v-icon>
                <span
                class="success--text"
                style="font-weight: bold"
                v-if="getVisibilityFlag(i, j).value"
                >
                  {{sectence.transText}}
                </span>
              </span>
            </div>
          </v-tab-item>
          <v-tab-item :key="'england'">
            <v-container>
              <v-layout row wrap
              v-for="(paragraph, i) in part.content"
              :key="`part2${i}`"
              >
                <v-flex xs6>
                  <span>&nbsp;&nbsp;</span>
                  <span :style="textStyle" v-for="(sectence, j) in paragraph.sectences" :key="`part${i}sen${j}_originText`">
                    <span>{{sectence.originText}}</span>
                  </span>
                </v-flex>
                <v-flex xs6>
                  <span>&nbsp;&nbsp;</span>
                  <span :style="textStyle" v-for="(sectence, j) in paragraph.sectences" :key="`part${i}sen${j}_transText`">
                    <span>{{sectence.transText}}</span>
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    'part': {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabMod: 'eng',
      visibilityKeys: [],
      fontSize: 18
    }
  },
  methods: {
    getVisibilityFlag (i, j) {
      return this.visibilityKeys.find(k => k.key === `${i}${j}`)
    },
    toggleVisibility (i, j) {
      let flag = this.getVisibilityFlag(i, j)
      flag.value = !flag.value
    }
  },
  computed: {
    playerWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '255px'
        case 'sm': return '450px'
        case 'md': return '700px'
        case 'lg': return '1000px'
        case 'xl': return '1500px'
      }
    },
    playerHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '160px'
        case 'sm': return '250px'
        case 'md': return '400px'
        case 'lg': return '600px'
        case 'xl': return '850px'
      }
    },
    textStyle () {
      return {fontSize: `${this.fontSize}px`}
    }
  },
  created () {
    for (let i = 0; i < this.part.content.length; i++) {
      for (let j = 0; j < this.part.content[i].sectences.length; j++) {
        this.visibilityKeys.push({
          key: `${i}${j}`,
          value: false
        })
      }
    }
  }
}
</script>

<style>

</style>
