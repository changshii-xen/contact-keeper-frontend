<template>
  <div id="Page">
      <sui-menu >
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        @click="select(item)"
      />
      <sui-menu-menu position="right">
        <a
          is="sui-menu-item"
          :active="isActive('Logout')"
          content="Logout"
          @click="handleLogout"
        />
      </sui-menu-menu>
    </sui-menu>

    <sui-segment>
       <div id="start">
      <sui-tab id="tabs" active-index="1">
      <sui-tab-pane title="New Contact">
        <h1>Create New Contact</h1>
      <sui-input placeholder="Name..." v-model.lazy="contact.name" icon-position="left"
      icon="id badge outline icon" focus /> <br> <br> 
      <sui-input placeholder="Email..." v-model.lazy="contact.email" icon-position="left"
      icon="at icon" focus /> <br> <br> 
      <sui-input placeholder="Phone..." v-model.lazy="contact.phone" icon-position="left"
      icon="phone" focus /> <br> <br> 
      <sui-form>
    <sui-form>
    <sui-form-fields grouped>
      Types:
      <sui-form-field>
        <sui-checkbox radio label="Personal" value="Personal" v-model="contact.type" />
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox radio label="Professional" value="Professional" v-model="contact.type" />
      </sui-form-field>
    </sui-form-fields>
  </sui-form>
  </sui-form>
      <sui-button type="button" v-on:click.prevent="handleAddContact" basic positive> </sui-button>
      </sui-tab-pane>
    </sui-tab>
    </div>
    </sui-segment>
    <sui-card id="contact-card" v-for="person in contacts" :key="person.id">
      <sui-card-content>
        <sui-card-header>
          <sui-icon name="id badge outline icon" />
          Name:  {{ person.name }}
          </sui-card-header>
        <sui-card-description>
          <sui-icon name="at icon" />
          Email: {{ person.email }}
        </sui-card-description>
        <sui-card-description>
          <sui-icon name="phone" />
          Phone: {{ person.phone }}
        </sui-card-description>
      </sui-card-content>
      <sui-card-content extra>
        <sui-icon name="user" />
        Type:  {{ person.type}}
      </sui-card-content>
      <sui-button color="red" v-on:click.prevent="handleDeleteContact(person._id)" inverted>Delete</sui-button>
      <sui-button color="teal"  @click.native="toggle(person)" inverted>Update</sui-button>
    </sui-card>
    <sui-modal v-model="open">
      <sui-modal-header>Update Contact</sui-modal-header>
      <sui-modal-content >
        <sui-input placeholder="Name..." v-model="contact.name" icon-position="left"
        icon="id badge outline icon" focus /> <br> <br>
        <sui-input placeholder="Email..." v-model="contact.email" icon-position="left"
        icon="at icon" focus /> <br> <br>
        <sui-input placeholder="Phone..." v-model="contact.phone" icon-position="left"
      icon="phone" focus /> <br> <br>
      <sui-form>
    <sui-form-fields grouped>
      Types:
      <sui-form-field>
        <sui-checkbox radio label="Personal" value="Personal" v-model="contact.type" />
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox radio label="Professional" value="Professional" v-model="contact.type" />
      </sui-form-field>
    </sui-form-fields>
  </sui-form> 
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button color="teal"  v-on:click.prevent="handleUpdateContact(contact._id)" inverted>Update</sui-button>
        <sui-button color="red" @click.native="toggle" inverted>
          exit
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
    
export default {
    data() {
    return {
      open: false,
      active: 'Contact Keeper',
      items: ['Contact Keeper'],
      submitted: false,
      contacts: [],
      contact:{},
      current: null,
      options: [
        {
          text: 'Personal',
          value: 1,
        },
        {
          text: 'Professional',
          value: 2,
        },
      ],
    };
  },
  methods: {
    toggle(person) {
      this.contact = person;
      console.log('toggle-contact ', JSON.stringify(this.contact));
      this.open = !this.open;
    },
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
    handleAddContact(){
      let URL = "https://contact-keepr1-api.herokuapp.com/api/contacts";
      let _data = this.contact;
      let token = window.localStorage.getItem('token');
      console.log(JSON.stringify(_data));
      fetch(URL, {
                method:"POST",   
                body:  JSON.stringify(_data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token,
                }
            }).then(response => response.json())
                .then(json => {
                    console.log('json->', json);
                })
                .catch(err => console.log('err->', err))
    },
    handleGetContacts(){
      let URL = "https://contact-keepr1-api.herokuapp.com/api/contacts";
      let token = window.localStorage.getItem('token');
      fetch(URL, {
                method:"GET",   
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token,
                }
            })
            .then(response => response.json())
                .then(json => {
                    this.contacts = json;
                })
                .catch(err => console.log('err->', err))
    },
    handleDeleteContact(id){
     
      let URL = `https://contact-keepr1-api.herokuapp.com/api/contacts/${id}`;
      let token = window.localStorage.getItem('token');
      fetch(URL, {
                method:"DELETE",   
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token,
                }
            })
            .then(response => response.json())
                 .then(json => {
                console.log('json->', json);
                    this.handleGetContacts();

                })
                .catch(err => console.log('err->', err))
    },
    handleUpdateContact(id){
      let URL = `https://contact-keepr1-api.herokuapp.com/api/contacts/${id}`;
      let _data = this.contact;
      let token = window.localStorage.getItem('token');
      fetch(URL, {
                method:"PUT",
                body:  JSON.stringify(_data),   
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token,
                }
            })
            .then(response => response.json())
                 .then(json => {
                    console.log('json->', json);
                    this.handleGetContacts();
                })
                .catch(err => console.log('err->', err))
    },
    
    handleLogout() {
      localStorage.removeItem('token');
      this.$router.push('/')
    }
  }, created(){
      this.handleGetContacts();
  }
}
</script>

<style>
#contact-card{
    display: flex;
  max-width: 70%;
  flex-wrap: wrap;
  justify-content: space-between;
  
  
  margin-left: 15%;
  }
@media only screen and (max-width: 600px) {
  #contact-card{
    margin-left: 10%;
  }
}

</style>
