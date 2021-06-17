<template>
<div>

    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
       <div class="col-xl-3 col-lg-6">
          <a href="/#/myCodes"><stats-card
            title="Assegna codici"
            type="gradient-red"
            sub-title=""
            icon="ni ni-curved-next"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i></span
              >
              <span class="text-nowrap"><a href="/#/myCodes">Vai!</a></span>
            </template>
          </stats-card></a>
        </div>
        <div class="col-xl-3 col-lg-6">
         <a href="/#/customers"> <stats-card
            title="Visualizza tutti i clienti"
            type="gradient-orange"
            sub-title=""
            icon="ni ni-single-02"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i></span
              >
              <span class="text-nowrap"><a href="/#/customers">Vai!</a></span>
            </template>
          </stats-card></a>
        </div>
        <div class="col-xl-3 col-lg-6">
          <a href="/#/newCustomer"><stats-card
            title="Registra nuovi clienti"
            type="gradient-green"
            sub-title=""
            icon="ni ni-badge"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> </span
              >
              <span class="text-nowrap"><a href="/#/newCustomer">Vai!</a></span>
            </template>
          </stats-card></a>
        </div>
        <div class="col-xl-3 col-lg-6">
         <a href="/#/myCodes"> <stats-card
            title="visualizza i tuoi codici"
            type="gradient-info"
            sub-title=""
            icon="ni ni-bullet-list-67"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> </span
              >
              <span class="text-nowrap"><a href="/#/myCodes">Vai!</a></span>
            </template>
          </stats-card></a>
        </div>
      </div>
    </base-header>
      

 <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Customer</h3>
            </div>
            <div class="card-body">
              <div v-if="success" class="col-lg-12 mb-2">
                <div
                  class="alert alert-success alert-dismissable fade show"
                  role="alert"
                >
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  {{ success }}
                </div>
              </div>
              <div v-if="errors" class="col-lg-12 mb-2">
                <div
                  class="alert alert-danger alert-dismissable fade show"
                  role="alert"
                >
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  {{ errors }}
                </div>
              </div>
            <b-row>
                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Sort"
                    label-for="sort-by-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-input-group size="sm">
                      <b-form-select
                        id="sort-by-select"
                        v-model="sortBy"
                        :options="sortOptions"
                        :aria-describedby="ariaDescribedby"
                        class="w-75"
                      >
                        <template #first>
                          <option value="">-- none --</option>
                        </template>
                      </b-form-select>

                      <b-form-select
                        v-model="sortDesc"
                        :disabled="!sortBy"
                        :aria-describedby="ariaDescribedby"
                        size="sm"
                        class="w-25"
                      >
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Initial sort"
                    label-for="initial-sort-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      id="initial-sort-select"
                      v-model="sortDirection"
                      :options="['asc', 'desc', 'last']"
                      size="sm"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                      ></b-form-input>

                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''"
                          >Clear</b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                  <b-form-group
                    v-model="sortDirection"
                    label="Filter On"
                    description="Leave all unchecked to filter on all data"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-checkbox-group
                      v-model="filterOn"
                      :aria-describedby="ariaDescribedby"
                      class="mt-1"
                    >
                      <b-form-checkbox value="name">Name</b-form-checkbox>
                      <b-form-checkbox value="surname">Surname</b-form-checkbox>
                      <b-form-checkbox value="username">UserName</b-form-checkbox>
                      <b-form-checkbox value="ecoPoint">Eco points</b-form-checkbox>
                      <b-form-checkbox value="address">Address</b-form-checkbox>
                      <b-form-checkbox value="phone">Phone</b-form-checkbox>
                      <b-form-checkbox value="dob">Date of birth</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>

                <b-col sm="5" md="6" class="my-1">
                  <b-form-group
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      id="per-page-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="sm"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                    <!-- Main Table -->
                <b-table
                  style="background-color: white"
                  hover
                  :items="customers"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  :sort-direction="sortDirection"
                  stacked="md"
                  show-empty
                  small
                  @filtered="onFiltered"
                >
                  <template #cell(actions)="data">
                    <div
                      class="btn-group mt-4 ml-5"
                      role="group"
                      aria-label="Basic example"
                    >
                      <form class="form-group">
                        <b-button
                          @click.prevent="
                            submitDelete(data.item.id, data.index)
                          "
                          :id="data.item.id"
                          type="button"
                          class="btn btn-danger"
                        >
                          <b-spinner
                            :id="data.item.id"
                            v-if="isLoading[data.index]"
                          ></b-spinner>
                          <span v-if="!isLoading[data.index]">Elimina</span>
                        </b-button>
                      </form>
                      <b-form class="ml-2">
                        <b-button
                          v-b-modal="`modalUpdateCustomer${data.item.id}`"
                          @click="showModal2[index]= true"
                          class="btn btn-primary"
                          :id="'mod' + data.item.id"
                          >Modifica</b-button
                        >
                      </b-form>
                    </div>
                  </template>
                </b-table>

                <b-col sm="7" md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
            </b-row>
            <div v-for="(customer, index) in customers" :key="customer.id">
                <b-modal
                  :id="`modalUpdateCustomer${customer.id}`"
                  title="Update Customer"
                  hide-footer
                  v-model="showModal2[index]"
                >
                  <b-form ref="form" @submit.prevent="submitUpdate(customer.id, index)">
                    <b-form-group
                      label="Change Name"
                      label-for="name-input"
                      invalid-feedback="Name of Customer is required"
                    >
                      <b-form-input
                        id="name-input"
                        name="name"
                        v-model="requestFields.name"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Change Surname"
                      label-for="surname-input"
                      invalid-feedback="Surnme of Customer is required"
                    >
                      <b-form-input
                        id="surname-input"
                        name="surname"
                        v-model="requestFields.surname"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Change Username"
                      label-for="username-input"
                      invalid-feedback="Username of Customer is required"
                    >
                      <b-form-input
                        id="username-input"
                        name="username"
                        v-model="requestFields.username"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Change Address"
                      label-for="address-input"
                      invalid-feedback="Address of Customer is required"
                    >
                      <b-form-input
                        id="address-input"
                        name="address"
                        v-model="requestFields.address"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Change Phone"
                      label-for="phone-input"
                      invalid-feedback="Phone of Customer is required"
                    >
                      <b-form-input
                        id="phone-input"
                        name="phone"
                        v-model="requestFields.phone"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Change Date Of Birth"
                      label-for="dob-input"
                      invalid-feedback="Date Of Birth of Customer is required"
                    >
                      <b-form-input
                        id="dob-input"
                        name="dob"
                        v-model="requestFields.dob"
                        type="date"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-button
                      type="submit"
                      class="btn btn-primary waves-effect waves-light m-r-5"
                    >
                      Salva
                    </b-button>
                    <b-button
                      type="reset"
                      class="btn btn-secondary waves-effect"
                    >
                      Annulla
                    </b-button>
                  </b-form>
                </b-modal>

              </div>
            
          </div>
        </div>
      </div>
    </div>          
</div>
</div>
</template>

<script>
import VueButtonSpinner from "vue-button-spinner";
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: [],
      requestFields: {},
      showModal: false,
      showModal2: [],
      success: false,
      loaded: true,
      errors: false,
      customers: [],
      items: [],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "surname",
          label: "Surname",
          sortable: true,
          class: "text-center",
        },
        {
          key: "username",
          label: "UserName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "ecoPoint",
          label: "Eco Points",
          sortable: true,
          class: "text-center",
        },
        
        {
          key: "address",
          label: "Address",
          sortable: true,
          class: "text-center",
        },
        {
          key: "phone",
          label: "Phone",
          sortable: true,
          class: "text-center",
        },
        {
          key: "dob",
          label: "Date Of Birth",
          sortable: true,
          class: "text-center",
        },
        

        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    axios.get("http://api-gateway.smartcity-uniupo.link/api/user/customer").then((response) => {
      this.customers = response.data;
      this.totalRows = this.customers.length;
    });
    // Set the initial number of items
  },
  components: {
    VueButtonSpinner,
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    // async submitUpdate(id, index) {
    //   if (this.loaded) {
    //     this.loaded = false;
    //     this.success = false;
    //     this.errors = false;
    //     await axios
    //       .put(
    //         `http://localhost/stage/public/api/home/listCode/update/${id}`,
    //         this.requestFields
    //       )
    //       .then((response) => {
    //         this.requestFields = {};
    //         this.loaded = true;
    //         this.success = "MESSAGGIO: Modificato " + response.data;
    //         Vue.set(this.showModal2, index, false);
    //         axios.get("http://localhost/stage/public/api/home/getCode").then((response) => {
    //           this.customers = response.data;
    //           this.totalRows = this.customers.length;
    //         });
    //       })
    //       .catch((error) => {
    //         this.loaded = true;
    //         this.status = false;
    //         this.showModal2 = false;
    //         this.errors = error.response.data.message;
    //       });
    //   }
    // },
    // async submitDelete(id, index) {
    //   if (this.loaded) {
    //     this.loaded = false;
    //     this.success = false;
    //     this.errors = null;
    //     await axios
    //       .delete(`http://localhost/stage/public/api/home/listCode/delete/${id}`)
    //       .then((response) => {
    //         this.loaded = true;
    //         Vue.set(this.isLoading, index, false);
    //         this.success = "MESSAGGIO: " + response.data;
    //         axios.get("http://localhost/stage/public/api/home/getCode").then((response) => {
    //           this.customers = response.data;
    //           this.totalRows = this.customers.length;
    //           this.isLoading = false;
    //         });
    //       })
    //       .catch((error) => {
    //         this.loaded = true;
    //         this.isLoading = false;
    //         this.status = false;
    //         this.errors = error.response.data.message;
    //       });
    //   }
    // },
  },
};
</script>
<style></style>