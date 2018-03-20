<template>
    <div class="app flex-row align-items-center">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
        </ul>


        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group">
                        <div class="card p-4">
                            <div class="card-body"><h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <div role="group" class="input-group mb-3">
                                    <div class="input-group-prepend"><span class="input-group-text"><i
                                            class="icon-user"></i></span></div>
                                    <input type="text" placeholder="Username" class="form-control"></div>
                                <div role="group" class="input-group mb-4">
                                    <div class="input-group-prepend"><span class="input-group-text"><i
                                            class="icon-lock"></i></span></div>
                                    <input type="password" placeholder="Password" class="form-control"></div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn px-4 btn-primary">Login</button>
                                    </div>
                                    <div class="text-right col-6">
                                        <button type="button" class="btn px-0 btn-link">Forgot password?</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card text-white bg-primary py-5 d-md-down-none" style="width: 44%;">
                            <div class="card-body text-center">
                                <div><h2>Sign up</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.</p>
                                    <button type="button" class="btn active mt-3 btn-primary">Register Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'login'
  }
</script>

<style scoped>

</style>