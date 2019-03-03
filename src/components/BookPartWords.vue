<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="words"
      content-tag="v-layout" row wrap
      :hide-actions="true"
    >
      <v-flex
        slot="item" slot-scope="props" xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title><h4>{{ props.item.origWords }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-card-text>{{ props.item.transWords }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab dark small color='primary'>
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: {
    'words': {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  }
}
</script>

<style>

</style>
