<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import UsersModal from './UsersModal.vue';

</script>
<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
                <BreadCrumb title="All Users" icon="bx bxs-user-badge"/>
				
				<div class="card">
					<div class="card-body">
						<div class="d-lg-flex align-items-center mb-4 gap-3">
							<div class="position-relative">
								<input type="text" class="form-control ps-5 radius-30" placeholder="Search"> <span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
							</div>
						  <div class="ms-auto"><a href="javascript:;" data-bs-toggle="modal" data-bs-target="#create-user" class="btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Add User</a></div>
						</div>
						<div class="table-responsive">
							<table class="table mb-0">
								<thead class="table-light">
									<tr>
										<th>Contact Name</th>
										<th>Contact Surname</th>
										<th>Email</th>
										<th>Cell Number</th>
										<th>Opt In</th>
										<th>Activation Area</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="i in 6">
										<td>Mazisi</td>
										<td>Msebele</td>
										<td>mazisi@gmail.com</td>
										<td>089 455 4322</td>
										<td><div class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class='bx bxs-circle align-middle me-1'></i>
											Yes</div></td>
											<td>
												Johannesburg
											</td>
										<td>
											<div class="d-flex order-actions">
												<a href="javascript:;" data-bs-toggle="modal" data-bs-target="#create-user" class=""><i class='bx bxs-edit'></i></a>
												<a href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a>
											</div>
										</td>
									</tr>
									
								
								</tbody>
							</table>
						</div>
					</div>
				</div>

<UsersModal/>
			</div>
		</div>
    </Layout>
</template>