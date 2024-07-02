<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

</script>
<template>
	<Layout>
		<div class="page-wrapper">
			<div class="page-content">
				<BreadCrumb title="Briefs" icon="" />
				<p>View and upload briefs</p>


				<div class="card">
					<div class="card-body">
						<!-- Code here -->
						<div class="container">
							<div>
								<div>
									<!-- <h1 class="my-4">Briefs</h1> -->
								</div>

								<div class="bg-dark mb-4"><button class="btn rounded-0 btn-primary">+ New</button></div>
							</div>
							<div class="row">
								<div v-for="i in 5" class="col-md-4 col-lg-3">
									<div class="brief-card">
										<h5 class="py-1 px-4 mb-0 text-center bg-black">Joburg Activation</h5>
										<div class="text-center"><i class='bx bxs-file-doc doc-icon'></i></div>
										<div class="d-flex justify-content-between align-items-center">
											<button
												class="btn bg-black text-white w-100 rounded-0 btn-outline-light">Read</button>
											<button
												class="btn text-white w-100 rounded-0 border border-primary bg-primary btn-outline-light">Share</button>
										</div>
										<div>
											<div class="d-flex mt-4 mb-3 custom-checkbox">
												<div class="d-flex align-items-center gap-2 w-100">
													<label> Accept</label>
													<input type="checkbox" checked>
												</div>
												<div class="d-flex justify-content-end align-items-center gap-2 w-100">
													<label> Decline</label>
													<input class="me-0" type="checkbox">
												</div>
											</div>
											<div class="d-flex justify-content-center">
												<button
													class="btn text-white rounded-0 w-50 btn-save mt-2">Save</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<style scoped>
/* body {
	background-color: #1c1c1c;
	color: white;
} */

.bg-black {
	background-color: black !important;
}

.brief-card {
	margin-bottom: 1rem;
}

.brief-card img {
	width: 100%;
	height: auto;
}

.new-badge {
	background-color: orange;
	color: white;
	padding: 0.2rem 0.5rem;
	border-radius: 0.3rem;
	font-size: 0.8rem;
}

.btn-save {
	background-color: #007bff;
	border: none;
}

.btn-save:hover {
	background-color: #0056b3;
}

.custom-checkbox input[type="checkbox"] {
	margin-right: 0.5rem;
}

.doc-icon {
	font-size: 5rem;
}
</style>