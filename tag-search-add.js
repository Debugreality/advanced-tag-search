/**
 * Created by Jai on 20/04/2019.
 */


Vue.component('tag-search', {
    props:{'tags':Array,
        'tagsdisplayed':{type: Number, default:6}
    },
    template: `

<div class="tag-search-container">
    <div class="tag-form-group tag-error" v-if="errorMsg.length > 0">{{errorMsg}}</div>
    <div class="tag-form-group">
        <span v-for="(tag, index) in selectedTags" class="tag tag-green-selected" @click="selectedTags.splice(index,1)">{{tag}}</span>
        <span v-if="selectedTags.length == 0" class="tag">no tag seleted</span>
    </div>
    <div>
        <label>Search for or add tag</label>
        <input type="text" class="tag-input-text" v-model="searchText">
        <button class="tag-input-button" @click="addTag">Add</button>
    </div>
    <div class="tag-form-group">
        <span v-for="(tag,index) in selectableTags" class="tag tag-green" @click="selectedTags.push(tag)" v-if="index < tagsdisplayed+showExtra">{{tag}}</span>
        <span v-if="showExtra > 0" class="tag tag-link" @click="showExtra-=tagsdisplayed">less...</span>
        <span v-if="tagsdisplayed+showExtra < selectableTags.length" class="tag tag-link" @click="showExtra+=tagsdisplayed">more...</span>
    </div>
    <div v-if="tagsdisplayed+showExtra < selectableTags.length" class="tag-footer">showing {{tagsdisplayed+showExtra}} of {{selectableTags.length}} tags</div>
</div>

`,
    data:function(){
        return {
            searchText:'',
            errorMsg:'',
            selectedTags:[],
            showExtra:0
        }
    },
    computed: {
        selectableTags: function(){
            return this.tags.filter((t) => {
                if (this.selectedTags.includes(t)) return false;
                if (this.searchText.length == 0 || t.toLowerCase().includes(this.searchText.toLowerCase())) return true;
                return false;
            });
        }
    },
    watch: {
        searchText: function(newText, oldText){
            this.errorMsg = '';
        },
        selectedTags: function(newTags, oldTags){
            // this pushes selected tags to the parent for further processing.
            this.$emit('tag-update', newTags);
        }
    },
    methods: {
        addTag: function(){
            if(this.searchText.length < 3)
            {
                this.errorMsg = 'New tags needs to have three or more characters';
                return;
            }
            this.$emit('add-tag', this.searchText);
            this.searchText = '';
        }
    }
});

