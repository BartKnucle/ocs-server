<template>
  <v-dialog
    v-model="visible"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ status }} {{ name }}</span>
      </v-card-title>
      <v-card-text>
        <ItemPicker
          :selected="data.source"
          :items="typeItems"
          @select="selectSource($event)"
          label="Source"
        />
        <v-text-field
          v-model="data.query"
          label="Query"
          hint="Enter the query for selection"
        />
        <ItemPicker
          :selected="data.group"
          :items="groupsToSelection"
          @select="selectGroup($event)"
          label="Group"
        />
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="close()"
          text
        >
          Close
        </v-btn>
        <v-btn
          @click="save()"
          text
        >
          {{ status }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ItemPicker from '~/components/customs/item-picker.vue'
export default {
  components: {
    ItemPicker
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    dialog: {
      type: Boolean,
      default: true
    },
    ruleid: {
      type: String,
      default: null
    },
    rules: {
      type: Array,
      default: () => { return [] }
    },
    groups: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      name: 'rules',
      data: {
        source: '',
        query: '',
        group: ''
      },
      visible: false,
      typeItems: [
        {
          value: 'devices',
          text: 'Devices',
          icon: 'mdi-laptop'
        },
        {
          value: 'subnets',
          text: 'Subnets',
          icon: 'mdi-server-network'
        }
      ]
    }
  },
  computed: {
    groupsToSelection () {
      return this.groups.map((group) => {
        return {
          value: group._id,
          text: group._id
        }
      })
    }
  },
  watch: {
    dialog (val) {
      this.visible = val
    },
    visible (val) {
      !val && this.close()
    },
    ruleid (val) {
      if (this.status === 'Edit') {
        this.data = Object.assign(this.data, this.get(this.ruleid))
      }
    }
  },
  methods: {
    close () {
      this.$emit('closed')
    },
    edited () {
      this.$emit('edited')
    },
    save () {
      this.$emit(
        'saved',
        { _id: this.ruleid, data: this.data }
      )
      this.reset()
      this.close()
    },
    reset () {
      this.data = {
        source: '',
        query: '',
        group: ''
      }
    },
    selectSource (id) {
      this.data.source = id
    },
    selectGroup (id) {
      this.data.group = id
    }
  }
}
</script>
