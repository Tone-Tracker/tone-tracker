<script setup>
import { onMounted, ref,watch, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { useCampaignStore } from '@/stores/useCampaign';
import { useRoute } from 'vue-router';
import TabContainer from '@/components/general/TabContainer.vue';
import Tab from '@/components/general/Tab.vue';
import Region from '../regions/Region.vue';
import RegionComponent from '../regions/RegionComponent.vue';

const route = useRoute();
const clientId = ref(route.query.client);


watch(
  () => route.query.client,
  (newClientId) => {
    clientId.value = newClientId;
  }
);


const clientColor = JSON.parse(localStorage.getItem('clientColor'));

const clientColorStyles = {
    color: `#${clientColor?.color} !important`, //clientColor?.color,
    background: `#${clientColor?.color} !important`, //clientColor?.color
    borderColor: `#${clientColor?.color} !important`,
}




</script>

<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="View Campaign" icon="" :style="{ color: clientColorStyles?.color }" />
                <div class="card">
                    <div class="card-body">
						<TabContainer classes="nav nav-tabs nav-primary mb-0" role="tablist">
							<Tab class="nav-item" role="presentation">
								<a class="nav-link active" data-bs-toggle="tab" href="#regions" role="tab" aria-selected="true">
									<div class="d-flex align-items-center fs-6">
										<div class="tab-icon"><i class='bx bx-map font-22 me-1 maz-gradient-txt'></i>
										</div>
										<div class="tab-title"> Regions </div>
									</div>
								</a>
							</Tab>
							<Tab class="nav-item" role="presentation">
								<a class="nav-link" data-bs-toggle="tab" href="#activations" role="tab" aria-selected="false">
									<div class="d-flex align-items-center fs-6">
										<div class="tab-icon"><i class='bx bx-bookmark-alt font-22 maz-gradient-txt me-1'></i>
										</div>
										<div class="tab-title">Activations</div>
									</div>
								</a>
							</Tab>
							<Tab class="nav-item" role="presentation">
								<a class="nav-link" data-bs-toggle="tab" href="#warehouses" role="tab" aria-selected="false">
									<div class="d-flex align-items-center fs-6">
										<div class="tab-icon"><i class='bx bx-building-house font-22 maz-gradient-txt me-1'></i>
										</div>
										<div class="tab-title">Warehouses</div>
									</div>
								</a>
							</Tab>
						</TabContainer>
						<div class="tab-content pt-3">
							<div class="tab-pane fade show active" id="regions" role="tabpanel">
								<RegionComponent />
							</div>
							<div class="tab-pane fade" id="activations" role="tabpanel">
								<p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
							</div>
							<div class="tab-pane fade" id="warehouses" role="tabpanel">
								<p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
							</div>
						</div>
					</div>
               
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.nav-tabs .nav-link.active {
    color: #008cff !important;
}
</style>
