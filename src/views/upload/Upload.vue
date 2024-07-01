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
                            <div class="container ">
                                <div class="text-start">
                                    <div class="mb-5">
                                        <h1>Upload Documents</h1>
                                    </div>
                                    <div>
                                        <p>Upload supporting contract / documentation</p>
                                    </div>
                                    <div>
                                        <p>Add contract / document info</p>
                                    </div>
                                </div>
                                <div class="ms-5">
                                    <div class="form-group flex-direction-column">
                                        <div class="d-flex gap-5">
                                            <div class="">
                                                <div>
                                                    <label for="document-type">Document Type</label>
                                                </div>
                                                <div>
                                                    <select class="m-0" id="document-type">
                                                        <option class="">Choose document type</option>
                                                        <!-- Add more options as needed -->
                                                    </select>
                                                </div>

                                            </div>
                                            <div>
                                                <div>
                                                    <label for="document-subtype">Document Sub Type</label>
                                                </div>
                                                <div>
                                                    <select class="m-0" id="document-subtype">
                                                        <option>Choose document sub type</option>
                                                        <!-- Add more options as needed -->
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <label for="form-type">Form</label>
                                                </div>
                                                <div>
                                                    <select class="m-0" id="form-type">
                                                        <option>Choose document sub type</option>
                                                        <!-- Add more options as needed -->
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="upload-section">
                                        <label for="file-upload" class="file-upload-label">
                                            <input type="file" id="file-upload">
                                            <div
                                                class="d-flex flex-column align-items-center justify-content-center upload-box text-white">
                                                <div class="fs-1">+</div>
                                                <div>
                                                    <span class="fs-5">Upload file</span>
                                                </div>
                                            </div>

                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-primary rounded-0 ps-5 pe-5">Upload</button>
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
body {
    font-family: Arial, sans-serif;
    background-color: #111;
    color: white;
    margin: 0;
    padding: 0;
}

.container {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    /* text-align: center; */
}

h1 {
    font-size: 3em;
    margin-bottom: 10px;
}

p {
    font-size: 1.2em;
}

.form-group {
    /* display: flex; */
    justify-content: center;
    margin: 20px 0;
}

.form-group label {
    margin-right: 10px;
    font-size: 1em;
}

.form-group select {
    margin: 0 10px;
    padding: 5px 5px;
    background-color: #3f3e3e;
    color: white;
    /* border: 1px solid #555; */
    /* border-radius: 5px; */
    border: none !important;
    font-size: 1em;
}

.upload-section {
    margin: 20px 0;
}

.file-upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.file-upload-label input[type="file"] {
    display: none;
}

.upload-box {
    width: 200px;
    height: 100px;
    border: 2px dashed #fff;
    font-size: 2em;
    color: #555;
    margin-bottom: 10px;
}

.upload-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
}

.upload-button:hover {
    background-color: #0056b3;
}
</style>
