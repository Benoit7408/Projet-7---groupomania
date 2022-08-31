<template>

   <div class="container mt-5">
            <div class="row">
                <div class="col-lg-8">
                  <div class="news" :key="index" v-for="(news,index) in news.resultData">
                    <!-- Post content-->
                    <article>
                        <!-- Post header-->
                        <header class="mb-4">
                            <!-- Post title-->
                            <h1 class="fw-bolder mb-1">Welcome to Blog Post!</h1>
                            <!-- Post meta content-->
                            <div class="text-muted fst-italic mb-2">{{news.created}}</div>
                            <!-- Post categories-->
                            <a class="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                            <a class="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                        </header>
                        <!-- Preview image figure-->
                        <figure class="mb-4"><img class="img-fluid rounded" :src="news.image" alt="..." /></figure>
                        <!-- Post content-->
                        <section class="mb-5">
                            <p class="fs-5 mb-4">{{news.content}}</p>
                            
                        </section>
                    </article>
                    <!-- Comments section-->
                    <section class="mb-5">
                        <div class="card bg-light">
                            <div class="card-body">
                                <!-- Comment form-->
                                <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                                <!-- Comment with nested comments-->
                                <div class="d-flex mb-4">
                                    <!-- Parent comment-->
                                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div class="ms-3">
                                        <div class="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                  </div>
                </div>
            </div>
   </div>
                </template>


<script>
import http from  "../http"


export default {
  name : 'news-page',
  data(){
    return{
      news : "",
    }
  },



  
  mounted(){
  
  http.get("/news")
  .then((response) => {
    this.news = response.data;
    console.log(response.data.resultData[0].id); 
  })
  }
}



</script>


<style scoped>

.news{
  border: 10px solid #d1515a;

margin-bottom : 5%;
}
.card-body{
  opacity: 1 ;
}

.mb-5{
  margin-bottom: 0%;
}

</style>
