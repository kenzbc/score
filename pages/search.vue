<template>
  <div>

    <div class="page-main">
      <div class="search_main">
        <div class="search_content">
          <form>
            <ul class="search_type_btn cl">
              <li><a href="javascript:;" onclick="search_type(this,'user');">搜人</a></li>
              <li><a href="javascript:;" onclick="search_type(this,'bar');">贴子</a></li>
              <li><a href="javascript:;" onclick="search_type(this,'circle');">圈子</a></li>
            </ul>
            <div class="search_detail">
              <input type="text" class="search_input" name="keyword" :value="$route.query.keyword" placeholder="请输入搜索关键词">
              <input type="hidden" class="search_type" name="type" value="<?php echo $type ?>">
              <a href="javascript:;" class="search_btn flr">搜索</a>
            </div>
          </form>
        </div>
        <!--搜索结果-->
        <div class="row">
          <div class="search_info col-md-8 col-lg-9 col-sm-12 col-xs-12">

            <!--搜人-->
            <div class="row">
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/4275691" target="_blank" class="search_people_pic fll">
                      <img src="http://p.qlogo.cn/qtl_user/13350bf7b7690e677619ac03a1608e124e6823e6b6ff60ed57c726a1de7a33bd/0" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/4275691" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>#掌盟</span>
                          <img src="https://www.famulei.com/https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/4275691" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/4275691/attention" target="_blank">关注：<span>0</span></a></li>
                      <li><a href="/u/4275691/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/4275691" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/4275691" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="4275691" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/907157" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/907157/picture/15/9/24/2015092418354129212_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/907157" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>的Blue</span>
                          <img src="https://www.famulei.com/https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/907157" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/907157/attention" target="_blank">关注：<span>20</span></a></li>
                      <li><a href="/u/907157/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/907157" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/907157" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="907157" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1071129" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1071129" target="_blank" class="cl">
                          <span class="fll">听说<font color="red">十三月</font>你会忘记他</span>
                          <img src="https://www.famulei.com/https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1071129" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1071129/attention" target="_blank">关注：<span>9</span></a></li>
                      <li><a href="/u/1071129/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1071129" target="_blank">贴数：<span>3</span></a></li>
                      <li><a href="/u/1071129" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1071129" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/951107" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/951107/picture/15/9/28/2015092816335393898_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/951107" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>目蜗牛</span>
                          <img src="https://www.famulei.com/https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/951107" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/951107/attention" target="_blank">关注：<span>25</span></a></li>
                      <li><a href="/u/951107/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/951107" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/951107" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="951107" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1092563" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1092563" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>底娶你</span>
                          <img src="https://www.famulei.com/https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1092563" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1092563/attention" target="_blank">关注：<span>4</span></a></li>
                      <li><a href="/u/1092563/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1092563" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1092563" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1092563" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1194219" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/1194219/picture/15/10/22/2015102223173069302_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1194219" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>的爱</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1194219" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1194219/attention" target="_blank">关注：<span>4</span></a></li>
                      <li><a href="/u/1194219/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1194219" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1194219" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1194219" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1282333" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1282333" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>的神</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1282333" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1282333/attention" target="_blank">关注：<span>5</span></a></li>
                      <li><a href="/u/1282333/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1282333" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1282333" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1282333" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1310348" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1310348" target="_blank" class="cl">
                          <span class="fll">花开<font color="red">十三月</font></span>
                          <img src="/static/images/new_index/sex_girl_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1310348" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1310348/attention" target="_blank">关注：<span>8</span></a></li>
                      <li><a href="/u/1310348/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1310348" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1310348" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1310348" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1367905" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/1367905/picture/15/11/06/2015110614434318304_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1367905" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>5163</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1367905" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1367905/attention" target="_blank">关注：<span>3</span></a></li>
                      <li><a href="/u/1367905/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1367905" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1367905" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1367905" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1071966" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1071966" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>☆泉</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1071966" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1071966/attention" target="_blank">关注：<span>5</span></a></li>
                      <li><a href="/u/1071966/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1071966" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1071966" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1071966" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1651149" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1651149" target="_blank" class="cl">
                          <span class="fll">ST丶<font color="red">十三月</font>凉</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1651149" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1651149/attention" target="_blank">关注：<span>1</span></a></li>
                      <li><a href="/u/1651149/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1651149" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1651149" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1651149" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1652877" target="_blank" class="search_people_pic fll">
                      <img src="http://img1.famulei.com/m/1652877/p/165/2900184148052_100x100.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1652877" target="_blank" class="cl">
                          <span class="fll">世间并无<font color="red">十三月</font></span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1652877" target="_blank">嘿呀</a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1652877/attention" target="_blank">关注：<span>2</span></a></li>
                      <li><a href="/u/1652877/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1652877" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1652877" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1652877" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1679644" target="_blank" class="search_people_pic fll">
                      <img src="http://img1.famulei.com/member/1679644/picture/15/12/05/2015120521224328753_100x100.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1679644" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>的流氓</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1679644" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1679644/attention" target="_blank">关注：<span>2</span></a></li>
                      <li><a href="/u/1679644/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1679644" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1679644" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1679644" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1703390" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/1703390/picture/15/12/06/2015120603091356820_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1703390" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>32号</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1703390" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1703390/attention" target="_blank">关注：<span>2</span></a></li>
                      <li><a href="/u/1703390/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1703390" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1703390" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1703390" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1765213" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/1765213/picture/15/12/13/2015121320293923485_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1765213" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>丶</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1765213" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1765213/attention" target="_blank">关注：<span>15</span></a></li>
                      <li><a href="/u/1765213/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1765213" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1765213" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1765213" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1803169" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1803169" target="_blank" class="cl">
                          <span class="fll">奢求de<font color="red">十三月</font></span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1803169" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1803169/attention" target="_blank">关注：<span>3</span></a></li>
                      <li><a href="/u/1803169/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1803169" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1803169" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1803169" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1847296" target="_blank" class="search_people_pic fll">
                      <img src="http://img1.famulei.com/member/1847296/picture/15/12/25/2015122518115668060_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1847296" target="_blank" class="cl">
                          <span class="fll">未央<font color="red">十三月</font></span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1847296" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1847296/attention" target="_blank">关注：<span>11</span></a></li>
                      <li><a href="/u/1847296/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1847296" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1847296" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1847296" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1904064" target="_blank" class="search_people_pic fll">
                      <img src="http://img.famulei.com/member/1904064/picture/15/12/29/2015122920325053538_100x100.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1904064" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>T</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1904064" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1904064/attention" target="_blank">关注：<span>3</span></a></li>
                      <li><a href="/u/1904064/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1904064" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1904064" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1904064" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/1978615" target="_blank" class="search_people_pic fll">
                      <img src="/static/images/tx_pic.jpg" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/1978615" target="_blank" class="cl">
                          <span class="fll"><font color="red">十三月</font>梦的延续</span>
                          <img src="/static/images/new_index/sex_girl_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/1978615" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/1978615/attention" target="_blank">关注：<span>2</span></a></li>
                      <li><a href="/u/1978615/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/1978615" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/1978615" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="1978615" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                <div class="search_people_wrap">
                  <div class="search_people_top cl">
                    <a href="/u/2176258" target="_blank" class="search_people_pic fll">
                      <img src="http://img1.famulei.com/m/2176258/p/162/2122055427265.png" width="100%">
                    </a>
                    <div class="search_people_right fll">
                      <h4>
                        <a href="/u/2176258" target="_blank" class="cl">
                          <span class="fll">丶<font color="red">十三月</font>结婚</span>
                          <img src="https://www.famulei.com/images/new_index/sex_boy_big.png" class="fll">
                        </a>
                      </h4>
                      <p><a href="/u/2176258" target="_blank"></a></p>
                    </div>
                  </div>
                  <div class="search_people_main cl">
                    <ul class="fll">
                      <li><a href="/u/2176258/attention" target="_blank">关注：<span>5</span></a></li>
                      <li><a href="/u/2176258/fans" target="_blank">粉丝：<span>0</span></a></li>
                      <li><a href="/u/2176258" target="_blank">贴数：<span>0</span></a></li>
                      <li><a href="/u/2176258" target="_blank">体重：<span></span></a></li>
                    </ul>

                    <a href="javascript:;" class="search_people_btn flr" data-user-id="2176258" data-attention-status="0" onclick="changeAttention(this)">关注</a>
                  </div>
                </div>
              </div>

            </div>

            <!--搜贴子-->
            <ul class="circle_list">
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009672" target="_blank">英雄联盟赛事数据：第八周最佳阵容</a></h2>
                            <p>
                                <a style="width:100%" href="/u/776336" target="_blank"><span>---英雄联盟赛事</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>1分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009672)">
                                    <i id="bar_id_1009672" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009672" target="_blank">英雄联盟赛事数据：第八周最佳阵容</a></h2>
                        <p>
                          <a href="/u/776336" target="_blank"><i class="iconfont icon-louzhu"></i><span>英雄联盟赛事</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009672)">
                            <i id="bar_id_1009672" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>1分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009672" target="_blank">2019<font color="red">lpl</font>春季赛第8周最佳阵容：上路- @TOPSPORTS电子竞技俱乐部 &nbsp;369 选手打野- @皇族电子竞技俱乐部 &nbsp;Karsa 选手中路- @FPX电子竞技俱乐部 &nbsp;Doinb 选手下路- @WE电子竞技俱乐部 &nbsp;Mystic 选手辅助- @WE电子竞技俱乐部 &nbsp;Mis</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/776336/p/193/1814072462835.jpeg"><img class="lazy" src="" data-original="https://img1.famulei.com/z/776336/p/193/1814072462835.jpeg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009669" target="_blank"><font color="red">lpl</font>第8周最佳阵容：WE下路组合入选</a></h2>
                            <p>
                                <a style="width:100%" href="/u/776336" target="_blank"><span>---英雄联盟赛事</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>7分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009669)">
                                    <i id="bar_id_1009669" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009669" target="_blank"><font color="red">lpl</font>第8周最佳阵容：WE下路组合入选</a></h2>
                        <p>
                          <a href="/u/776336" target="_blank"><i class="iconfont icon-louzhu"></i><span>英雄联盟赛事</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009669)">
                            <i id="bar_id_1009669" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>7分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009669" target="_blank"><font color="red">lpl</font>常规赛仅剩2周便将结束，谁能在最后的冲刺阶段脱颖而出？</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/776336/p/193/1814074261298.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/m/776336/p/193/1814103474181_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">2</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009667" target="_blank">官方建议WE在比赛中途喊加油 你怎么看？</a></h2>
                            <p>
                                <a style="width:100%" href="/u/2986866" target="_blank"><span>---金牌搬运工</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>17分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009667)">
                                    <i id="bar_id_1009667" class="iconfont icon-icon_4 "></i>
                                    <span>1人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009667" target="_blank">官方建议WE在比赛中途喊加油 你怎么看？</a></h2>
                        <p>
                          <a href="/u/2986866" target="_blank"><i class="iconfont icon-louzhu"></i><span>金牌搬运工</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009667)">
                            <i id="bar_id_1009667" class="iconfont icon-icon_4 "></i>
                            <span>1</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>17分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009667" target="_blank">在比赛结束之后，WE负责应援的工作人员在粉丝群里解释了这件事情</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/2986866/p/193/1814010416062.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/2986866/p/193/1814010472987_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/2986866/p/193/1814010452660.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/2986866/p/193/1814010466987_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/2986866/p/193/1814010560525.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/2986866/p/193/1814010580831_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">12</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009662" target="_blank"><font color="red">lpl</font>英文解说预测本周赛果：VG应能打穿WE</a></h2>
                            <p>
                                <a style="width:100%" href="/u/3032025" target="_blank"><span>---千年独奏歌</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>35分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009662)">
                                    <i id="bar_id_1009662" class="iconfont icon-icon_4 "></i>
                                    <span>4人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009662" target="_blank"><font color="red">lpl</font>英文解说预测本周赛果：VG应能打穿WE</a></h2>
                        <p>
                          <a href="/u/3032025" target="_blank"><i class="iconfont icon-louzhu"></i><span>千年独奏歌</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009662)">
                            <i id="bar_id_1009662" class="iconfont icon-icon_4 "></i>
                            <span>4</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>35分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009662" target="_blank">本周各位英文解说在预测赛果方面产生了不小分歧，有两位解说认为VG可以把WE战队斩落马下。</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/3032025/p/193/1813421471706.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/m/3032025/p/193/1813483437282_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">4</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009647" target="_blank">【致童道合】JDG vs SS——季后赛末班车，京东不“玩蛇</a></h2>
                            <p>
                                <a style="width:100%" href="/u/6300588" target="_blank"><span>---致童道合</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>58分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009647)">
                                    <i id="bar_id_1009647" class="iconfont icon-icon_4 "></i>
                                    <span>3人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009647" target="_blank">【致童道合】JDG vs SS——季后赛末班车，京东不“玩蛇</a></h2>
                        <p>
                          <a href="/u/6300588" target="_blank"><i class="iconfont icon-louzhu"></i><span>致童道合</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009647)">
                            <i id="bar_id_1009647" class="iconfont icon-icon_4 "></i>
                            <span>3</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>58分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009647" target="_blank">SS想要获胜需要在保证下路平稳发育的基础上，拿到上中的大优势，其他情况下，更看好JDG取胜</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813080328606.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813080331964_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813080426898.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813080430178_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813080439128.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813080440749_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">5</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009644" target="_blank">【致童道合】RW VS VG 我们WR是不可战胜的</a></h2>
                            <p>
                                <a style="width:100%" href="/u/6300588" target="_blank"><span>---致童道合</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>43分钟前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009644)">
                                    <i id="bar_id_1009644" class="iconfont icon-icon_4 "></i>
                                    <span>6人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009644" target="_blank">【致童道合】RW VS VG 我们WR是不可战胜的</a></h2>
                        <p>
                          <a href="/u/6300588" target="_blank"><i class="iconfont icon-louzhu"></i><span>致童道合</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009644)">
                            <i id="bar_id_1009644" class="iconfont icon-icon_4 "></i>
                            <span>6</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>43分钟前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009644" target="_blank">双方都没有战绩压力，最近都偏爱强力团战阵容，预测RW会耗时三局带走比赛</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813081472921.gif"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813183330456_109x109.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813101422138.gif"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813203434269_112x112.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/6300588/p/193/1813121559941.gif"><img class="lazy" src="" data-original="https://img1.famulei.com/m/6300588/p/193/1813223476574_109x109.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009648" target="_blank"></a></h2>
                            <p>
                                <a style="width:100%" href="/u/2690080" target="_blank"><span>---RNG电子竞技俱乐部</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>1小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009648)">
                                    <i id="bar_id_1009648" class="iconfont icon-icon_4 "></i>
                                    <span>10人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009648" target="_blank"></a></h2>
                        <p>
                          <a href="/u/2690080" target="_blank"><i class="iconfont icon-louzhu"></i><span>RNG电子竞技俱乐部</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009648)">
                            <i id="bar_id_1009648" class="iconfont icon-icon_4 "></i>
                            <span>10</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>1小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009648" target="_blank">春季赛最后一次常规赛开票提醒来啦，下周我们将从北京飞往成都完成常规赛赛程，想要去现场观赛的小伙伴们千万不要错过噢！ &nbsp; &nbsp; 2019<font color="red">lpl</font>春季赛第九周门票将在下午两点开售，我们将于3月25日（下周一）在北京电子竞技中心对阵SDG战队，3月27日（下周三）在成都客场对阵OMG战</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/2690080/p/193/1813092480383.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/2690080/p/193/1813092449668_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009640" target="_blank"></a></h2>
                            <p>
                                <a style="width:100%" href="/u/5612599" target="_blank"><span>---SNH4cker</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>1小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009640)">
                                    <i id="bar_id_1009640" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009640" target="_blank"></a></h2>
                        <p>
                          <a href="/u/5612599" target="_blank"><i class="iconfont icon-louzhu"></i><span>SNH4cker</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009640)">
                            <i id="bar_id_1009640" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>1小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009640" target="_blank">#2019<font color="red">lpl</font>#我已为@苏宁易购电子竞技俱乐部 送上奖杯！快来为你喜爱的战队加油吧！http://t.cn/EqUynrc &#8203;</a></p>
                    <!-- 视频预览 -->
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009636" target="_blank">一个月前抢到的回忆录终于拿到手了快四年了真的见证了we的变化</a></h2>
                            <p>
                                <a style="width:100%" href="/u/2136180" target="_blank"><span>---补刀小星星</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>1小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009636)">
                                    <i id="bar_id_1009636" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009636" target="_blank">一个月前抢到的回忆录终于拿到手了快四年了真的见证了we的变化</a></h2>
                        <p>
                          <a href="/u/2136180" target="_blank"><i class="iconfont icon-louzhu"></i><span>补刀小星星</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009636)">
                            <i id="bar_id_1009636" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>1小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009636" target="_blank">一个月前抢到的回忆录终于拿到手了快四年了真的见证了we的变化从2015年保级到2016因为一个tp绕后眼位丧失通往全球赛的机会再到2017的<font color="red">lpl</font>夺冠、全球赛四强2018的沉寂、颓靡而如今是19年的的崭新征程Keep your dreams</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/b/2136180/p/193/1812432532739.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/z/2136180/p/193/1812443383842_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/b/2136180/p/193/1812434022729.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/z/2136180/p/193/1812443649098_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/b/2136180/p/193/1812435369673.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/z/2136180/p/193/1812444051479_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">8</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009622" target="_blank">昨日<font color="red">lpl</font>最佳数据：独挑大梁Doinb</a></h2>
                            <p>
                                <a style="width:100%" href="/u/3032025" target="_blank"><span>---千年独奏歌</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>2小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009622)">
                                    <i id="bar_id_1009622" class="iconfont icon-icon_4 "></i>
                                    <span>59人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009622" target="_blank">昨日<font color="red">lpl</font>最佳数据：独挑大梁Doinb</a></h2>
                        <p>
                          <a href="/u/3032025" target="_blank"><i class="iconfont icon-louzhu"></i><span>千年独奏歌</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009622)">
                            <i id="bar_id_1009622" class="iconfont icon-icon_4 "></i>
                            <span>59</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>2小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009622" target="_blank">微博“英雄联盟赛事数据”公布了昨日的<font color="red">lpl</font>最佳数据，Doinb以其对阵SDG时的精彩发挥成功当选。</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/3032025/p/193/1812125741215.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/m/3032025/p/193/1812134329976_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">3</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009615" target="_blank">3月17日TOP5：Doinb卡萨丁脚踩虚空步步致命</a></h2>
                            <p>
                                <a style="width:100%" href="/u/776336" target="_blank"><span>---英雄联盟赛事</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>2小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009615)">
                                    <i id="bar_id_1009615" class="iconfont icon-icon_4 "></i>
                                    <span>335人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009615" target="_blank">3月17日TOP5：Doinb卡萨丁脚踩虚空步步致命</a></h2>
                        <p>
                          <a href="/u/776336" target="_blank"><i class="iconfont icon-louzhu"></i><span>英雄联盟赛事</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009615)">
                            <i id="bar_id_1009615" class="iconfont icon-icon_4 "></i>
                            <span>335</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>2小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009615" target="_blank">3月17日<font color="red">lpl</font>精彩操作TOP5：Doinb卡萨丁脚踩虚空步步致命。</a></p>
                    <!-- 视频预览 -->
                    <ul class="video_list cl">
                      <li>
                        <a href="/p/1009615" class="video_a cl" target="_blank">
                          <img class="video_img" src="https://img1.famulei.com/z/776336/p/193/1811505681146.jpg">
                        </a>
                      </li>

                    </ul>


                    <!--缩略图列表-->
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">49</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009611" target="_blank">[趣味数据]队伍核心Mystic 各项数据均名列前茅</a></h2>
                            <p>
                                <a style="width:100%" href="/u/422922" target="_blank"><span>---夜笙歌</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>2小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009611)">
                                    <i id="bar_id_1009611" class="iconfont icon-icon_4 "></i>
                                    <span>495人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009611" target="_blank">[趣味数据]队伍核心Mystic 各项数据均名列前茅</a></h2>
                        <p>
                          <a href="/u/422922" target="_blank"><i class="iconfont icon-louzhu"></i><span>夜笙歌</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009611)">
                            <i id="bar_id_1009611" class="iconfont icon-icon_4 "></i>
                            <span>495</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>2小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009611" target="_blank">昨日，微博英雄联盟赛事数据公布了本赛季单场输出占比超过50%的4名选手，其中WE.Mystic以50.0%的输出占比位列第四。WE vs IG 第二场 赛后数据该数据来自于3月10日WE vs IG的第二场比赛，WE.Mystic使用伊泽瑞尔打出了30K的爆炸伤害，傲视全场。尽管</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/422922/p/193/1810425881672.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/m/422922/p/193/1811294213722_160x160.jpg"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/z/422922/p/193/1811100012318.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/422922/p/193/1811294388553_98x98.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/z/422922/p/193/1811170960645.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/422922/p/193/1811294397660_160x160.png"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">23</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009581" target="_blank">今日<font color="red">lpl</font>首发：Yagao中路对决fenfen</a></h2>
                            <p>
                                <a style="width:100%" href="/u/776336" target="_blank"><span>---英雄联盟赛事</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>3小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009581)">
                                    <i id="bar_id_1009581" class="iconfont icon-icon_4 "></i>
                                    <span>267人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009581" target="_blank">今日<font color="red">lpl</font>首发：Yagao中路对决fenfen</a></h2>
                        <p>
                          <a href="/u/776336" target="_blank"><i class="iconfont icon-louzhu"></i><span>英雄联盟赛事</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009581)">
                            <i id="bar_id_1009581" class="iconfont icon-icon_4 "></i>
                            <span>267</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>3小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009581" target="_blank">今天的对战情况为：VG对阵RW、JDG对阵SS。以下为各队比赛时间以及首发阵容名单。</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/776336/p/193/1810232149963.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/776336/p/193/1810232196405_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009578" target="_blank"></a></h2>
                            <p>
                                <a style="width:100%" href="/u/2842828" target="_blank"><span>---JDG电子竞技俱乐部</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>4小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009578)">
                                    <i id="bar_id_1009578" class="iconfont icon-icon_4 "></i>
                                    <span>48人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009578" target="_blank"></a></h2>
                        <p>
                          <a href="/u/2842828" target="_blank"><i class="iconfont icon-louzhu"></i><span>JDG电子竞技俱乐部</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009578)">
                            <i id="bar_id_1009578" class="iconfont icon-icon_4 "></i>
                            <span>48</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>4小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009578" target="_blank">#2019<font color="red">lpl</font># 毒物入侵，得把它揪出来<img class="biaoqing" src="https://img1.famulei.com/common/images/emoji/emoji_touxiao.png">今天 19 点，JDG vs Snake，倒数第四场啦，加油！#JDG[超话]# &#8203;</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/2842828/p/193/1810192191664.png"><img class="lazy" src="" data-original="https://img1.famulei.com/m/2842828/p/193/1810192142630_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">2</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009571" target="_blank">今日首发名单 圣枪哥与Zoom强强对决</a></h2>
                            <p>
                                <a style="width:100%" href="/u/5696814" target="_blank"><span>---backdo</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>4小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009571)">
                                    <i id="bar_id_1009571" class="iconfont icon-icon_4 "></i>
                                    <span>1人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009571" target="_blank">今日首发名单 圣枪哥与Zoom强强对决</a></h2>
                        <p>
                          <a href="/u/5696814" target="_blank"><i class="iconfont icon-louzhu"></i><span>backdo</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009571)">
                            <i id="bar_id_1009571" class="iconfont icon-icon_4 "></i>
                            <span>1</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>4小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009571" target="_blank">3月18日是2019英雄联盟职业联赛（<font color="red">lpl</font>）春季赛第九周第一天的比赛日，Snake将赶赴JDG的北京主场一决高下。</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/z/5696814/p/193/1810301111901.jpg"><img class="lazy" src="" data-original="https://img1.famulei.com/m/5696814/p/193/1810304158588_160x160.jpg"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">4</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009567" target="_blank"></a></h2>
                            <p>
                                <a style="width:100%" href="/u/5583821" target="_blank"><span>---TOP电子竞技俱乐部</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>4小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009567)">
                                    <i id="bar_id_1009567" class="iconfont icon-icon_4 "></i>
                                    <span>57人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009567" target="_blank"></a></h2>
                        <p>
                          <a href="/u/5583821" target="_blank"><i class="iconfont icon-louzhu"></i><span>TOP电子竞技俱乐部</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009567)">
                            <i id="bar_id_1009567" class="iconfont icon-icon_4 "></i>
                            <span>57</span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>4小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009567" target="_blank">各位上午好~#2019<font color="red">lpl</font>#我已为@TOPSPORTS电子竞技俱乐部 送上奖杯！快来为你喜爱的战队加油吧！http://t.cn/EqUynrc &#8203;</a></p>
                    <!-- 视频预览 -->
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009549" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] FPX vs SDG Game Highlights</a></h2>
                            <p>
                                <a style="width:100%" href="/u/5616692" target="_blank"><span>---Caramelized</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>7小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009549)">
                                    <i id="bar_id_1009549" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009549" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] FPX vs SDG Game Highlights</a></h2>
                        <p>
                          <a href="/u/5616692" target="_blank"><i class="iconfont icon-louzhu"></i><span>Caramelized</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009549)">
                            <i id="bar_id_1009549" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>7小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009549" target="_blank">W8D7: FPX vs SDG Highlights</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806533960878.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806574062111_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806534981630.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806574174941_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806540241507.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806574313968_160x160.png"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009548" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] RNG vs BLG Game Highlights</a></h2>
                            <p>
                                <a style="width:100%" href="/u/5616692" target="_blank"><span>---Caramelized</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>7小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009548)">
                                    <i id="bar_id_1009548" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009548" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] RNG vs BLG Game Highlights</a></h2>
                        <p>
                          <a href="/u/5616692" target="_blank"><i class="iconfont icon-louzhu"></i><span>Caramelized</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009548)">
                            <i id="bar_id_1009548" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>7小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009548" target="_blank">W8D7: RNG vs BLG Highlights</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806452656375.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806512912570_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806470443699.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806513135646_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806471490483.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806513254681_160x160.png"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009547" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] LGD vs OMG Game Highlights</a></h2>
                            <p>
                                <a style="width:100%" href="/u/5616692" target="_blank"><span>---Caramelized</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>7小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009547)">
                                    <i id="bar_id_1009547" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009547" target="_blank">[<font color="red">lpl</font> Spring 2019 W8D7] LGD vs OMG Game Highlights</a></h2>
                        <p>
                          <a href="/u/5616692" target="_blank"><i class="iconfont icon-louzhu"></i><span>Caramelized</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009547)">
                            <i id="bar_id_1009547" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>7小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009547" target="_blank">W8D7: Highlights for LGD vs OMG</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806323021263.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806413928736_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,1)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806335069891.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806414117438_160x160.png"></a></li>
                      <li><a href="javascript:;" onclick="pic_zoom(this,2)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1806343897251.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1806414214390_160x160.png"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="1" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <li data-step="2" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="circle_list_li">
                <div class="circle_list_div cl">
                  <span class="circle_list_left fll">0</span>
                  <div class="circle_list_main flr">
                    <!-- 搜索页问答贴子start -->
                    <!--<div class="circle_list_top cl">
                        <div class="fll">
                            <h2><a href="/p/1009545" target="_blank">[Press Conference] FPX Doinb: I hope I will be able to play my 500th game in <font color="red">lpl</font></a></h2>
                            <p>
                                <a style="width:100%" href="/u/5616692" target="_blank"><span>---Caramelized</span><span class="question_price">￥50</span></a>
                            </p>

                            <p class="author_n_summary">作者名字 | 作者简介</p>
                            <div class="avatar_n_audio">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                            <div class="audio_h5" data-audio="" data-time="" data-play="0">
                                <i class="audio_icon fll"></i>
                                <span class="touting_label fll">0元偷偷听</span>
                                <p class="audio_time flr">
                                    <span>176</span>"
                                </p>
                            </div>
                            </div>
                            <div class="avatar_n_video">
                                <img src="/images/new_index/tx_pic.jpg" class="avatar">
                                <div class="answer_video">
                                    <img src="/images/new_index/video_img.png" width="100%">
                                    <p class="video_footer">
                                        <span>100元偷偷看</span>
                                    <span class="flr">"</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="flr">
                            <p><i class="iconfont icon-shijian"></i>9小时前</p>
                            <p>
                                <a href="javascript:;" onclick="bar_praise(1009545)">
                                    <i id="bar_id_1009545" class="iconfont icon-icon_4 "></i>
                                    <span>人</span>
                                </a>
                            </p>
                        </div>
                    </div>-->
                    <!-- 搜索页问答帖子end -->
                    <div class="circle_list_top cl">
                      <div class="fll">
                        <h2><a href="/p/1009545" target="_blank">[Press Conference] FPX Doinb: I hope I will be able to play my 500th game in <font color="red">lpl</font></a></h2>
                        <p>
                          <a href="/u/5616692" target="_blank"><i class="iconfont icon-louzhu"></i><span>Caramelized</span></a>
                          <a href="javascript:;" onclick="bar_praise(1009545)">
                            <i id="bar_id_1009545" class="iconfont icon-icon_4 "></i>
                            <span></span>
                          </a>
                        </p>
                      </div>
                      <div class="flr">
                        <p><i class="iconfont icon-shijian"></i>9小时前</p>
                      </div>
                    </div>
                    <p class="circle_list_summary"><a href="/p/1009545" target="_blank">FPX's press conference after they took down SDG and are firmly in <font color="red">lpl</font> Playoffs.</a></p>
                    <!-- 视频预览 -->

                    <ul class="pic_normal cl">
                      <li><a href="javascript:;" onclick="pic_zoom(this,0)" data-bigimage="https://img1.famulei.com/m/5616692/p/193/1804354151588.png"><img class="lazy" src="" data-original="https://img1.famulei.com/z/5616692/p/193/1804365884161_160x160.png"></a></li>
                    </ul>


                    <!--大图左右切换-->
                    <div class="pic_big_wrap cl">
                      <p class="pic_btn"><a href="javascript:;" onclick="pic_return(this);">收起</a><span>|</span><a target="_blank" class="look_big_pic" href="">查看大图</a></p>
                      <ul class="pic_big cl">
                        <a href="javascript:;" onclick="pic_left(this);" class="pic_prev"></a>
                        <li data-step="0" class="hide"><a href="javascript:;" onclick="pic_return1(this);"><img src=""></a></li>
                        <a href="javascript:;" class="pic_next" onclick="pic_right(this);"></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>


            </ul>

            <!--搜圈子-->
            <div class="row">
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 list_item">
                <div class="search_circle_wrap">
                  <img src="https://img1.famulei.com/z/2962980/p/185/2410475739433.jpg" class="search_circle_bg" width="100%">
                  <div class="search_circle_main cl">
                    <a href="/c/23" target="_blank" class="search_circle_pic">
                      <img src="https://img1.famulei.com/z/2962980/p/187/0422035176175.jpg" width="100%">
                    </a>
                    <p class="search_circle_name"><a href="/c/23" target="_blank"><font color="red">we</font>电子竞技俱乐部</a></p>


                  </div>
                  <div class="search_circle_count">
                    <a href="/c/23" target="_blank">
                      <!--成员：-->
                      <i class="iconfont icon-louzhu"></i>
                      <span>235130</span>
                    </a>
                    <span class="search_circle_count_line">|</span>
                    <a href="/c/23" target="_blank">
                      <!--贴数：-->
                      <i class="iconfont icon-iconhuifu01"></i>
                      <span>9052</span>
                    </a>
                  </div>
                  <p class="search_circle_btn_wrap"><a href="javascript:;" class="fll btn-button search_circle_btn" data-user-id="23" data-attention-status="0" onclick="moment_attention(this);">加入</a></p>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 list_item">
                <div class="search_circle_wrap">
                  <img src="/static/images/moment/bg.png" class="search_circle_bg" width="100%">
                  <div class="search_circle_main cl">
                    <a href="/c/591" target="_blank" class="search_circle_pic">
                      <img src="https://img1.famulei.com/z/0/p/167/1515233661555.jpg" width="100%">
                    </a>
                    <p class="search_circle_name"><a href="/c/591" target="_blank"><font color="red">we</font>-问答圈</a></p>


                  </div>
                  <div class="search_circle_count">
                    <a href="/c/591" target="_blank">
                      <!--成员：-->
                      <i class="iconfont icon-louzhu"></i>
                      <span>14615</span>
                    </a>
                    <span class="search_circle_count_line">|</span>
                    <a href="/c/591" target="_blank">
                      <!--贴数：-->
                      <i class="iconfont icon-iconhuifu01"></i>
                      <span>1866</span>
                    </a>
                  </div>
                  <p class="search_circle_btn_wrap"><a href="javascript:;" class="fll btn-button search_circle_btn" data-user-id="591" data-attention-status="0" onclick="moment_attention(this);">加入</a></p>
                </div>
              </div>
            </div>

            <!--分页-->
            <div class="pagination">
              pagination
            </div>

          </div>

          <div class="search_slide col-md-4 col-lg-3 col-sm-12 col-xs-12">
            <h3 class="search_slide_title"><span></span>热门搜索</h3>
            <ul class="search_hot cl">
              <li><a href="//www.famulei.com/search?keyword=%E7%AC%91%E7%AC%91&amp;type=user">笑笑</a></li>
              <li><a href="//www.famulei.com/search?keyword=%E5%B0%8F%E6%99%BA&amp;type=user">小智</a></li>
              <li><a href="//www.famulei.com/search?keyword=%E8%8B%A5%E9%A3%8E&amp;type=user">若风</a></li>
              <li><a href="//www.famulei.com/search?keyword=%E5%8D%A1%E5%8D%A1&amp;type=user">卡卡</a></li>
              <li><a href="//www.famulei.com/search?keyword=%E5%B0%8F%E8%8B%8D&amp;type=user">小苍</a></li>
              <li><a href="//www.famulei.com/search?keyword=%E4%BB%99%E5%84%BF&amp;type=user">仙儿</a></li>
            </ul>


            <h3 class="search_slide_title"><span></span>人气明星</h3>
            <div class="search_slide_star cl">
              <a href="/u/<?php echo $hot_star['member_id'] ?>" target="_blank" class="search_slide_star_pic fll">
                <img src="/static/images/tx_pic.jpg" width="100%"></a>
              <div class="search_slide_star_info fll">
                <h4><a href="/u/<?php echo $hot_star['member_id'] ?>" target="_blank">
                  <img src="https://www.famulei.com/images/new_index/sex_boy_big.png">
                  <img src="/static/images/sex_girl_big.png">
                </a>
                </h4>
                <p><a href="/u/<?php echo $hot_star['member_id'] ?>" target="_blank">demo</a></p>
                <p><a href="/u/<?php echo $hot_star['member_id'] ?>" target="_blank">粉丝：234234</a></p>
              </div>
            </div>


            <h3 class="search_slide_title"><span></span>热门讨论</h3>
            <dl class="i_topic_box">
              <dt><a href="/p/<?php echo $hot_bar['bar_id'] ?>" target="_blank">title</a></dt>
              <dd><a href="/p/<?php echo $hot_bar['bar_id'] ?>" target="_blank">summary</a></dd>
              <dd><i class="iconfont icon-icon_3"></i>53423</dd>
            </dl>


            <h3 class="search_slide_title"><span></span>热门圈子</h3>
            <div class="search_slide_star cl">
              <a href="/c/637" target="_blank" class="search_slide_star_pic fll"><img src="https://img1.famulei.com/z/2957331/p/1811/0817005841076.png" width="100%"></a>
              <div class="search_slide_star_info fll">
                <h4><a href="/c/637" target="_blank">游乐场</a></h4>
                <p><a href="/c/637" target="_blank">这里不属于战队，这里什么都能聊。</a></p>
                <p><a href="/c/637" target="_blank">粉丝：1530</a></p>
              </div>
            </div>
            <div class="search_slide_star cl">
              <a href="/c/637" target="_blank" class="search_slide_star_pic fll"><img src="https://img1.famulei.com/z/2957331/p/1811/0817005841076.png" width="100%"></a>
              <div class="search_slide_star_info fll">
                <h4><a href="/c/637" target="_blank">游乐场</a></h4>
                <p><a href="/c/637" target="_blank">这里不属于战队，这里什么都能聊。</a></p>
                <p><a href="/c/637" target="_blank">粉丝：1530</a></p>
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
    name: "post",
    components: {},
    data() {
      return {
        circleRecommendList:[],
        activeUsersList:[],
        postDataList:[],
      }
    },
    filters:{

    },
    async asyncData({app, $axios, error, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      return this.$seo(
        `搜索`,
        `搜索`,
        `搜索`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {
      console.log(11);
    },
    methods: {
      async getStarList(){

      },
      async setAttention(star_id,is_attention) {


      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .page-main {
    max-width: 990px;
    margin: 36px auto;
    width: 100%;
    zoom: 1;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .search_main{ background-color: #fff; padding: 40px; border-radius: 5px; }
  .search_content{}
  .search_info { padding-right: 3%;  }
  .search_info .list_item {
    margin-bottom :20px;
  }
  .search_content ul{ margin-bottom: 24px; }
  .search_content ul li{ float: left; }
  .search_content ul li a{ display: inline-block; line-height: 40px; font-size: 16px; color: #999; border-radius: 5px; padding:0 14px; margin-right: 6px; }
  .search_content ul li a:hover,.search_content ul li a.active{ color: #000; background-color: #fddc00; }
  .search_detail{ margin-bottom: 36px; }
  .search_input{ width: 88%; height: 42px; line-height: 42px; font-size: 16px; color: #666; background-color: #fff; border: 1px solid #ddd;  padding: 0 2%; margin-right: 2%; border-radius: 5px;}
  .search_btn{ display: inline-block; width: 10%; line-height: 44px; font-size: 16px; text-align: center; color: #000; background-color: #fddc00; border-radius: 5px;}
  .search_btn:hover{ color: #000; background-color: #ffbd00; }
  .search_slide_title{ font-size: 16px; color: #666; margin-top: 0; margin-bottom: 20px;}
  .search_slide_title span{ display: inline-block; width: 5px; height: 16px; background-color: #fddc00; vertical-align: middle; margin-right: 8px; }
  .search_hot{ padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;}
  .search_hot li{ margin-right: 10px; margin-bottom: 10px; float: left; }
  .search_hot li a{ display: inline-block; line-height: 30px; text-align: center; font-size: 14px; color: #3399cc; background-color: #eee; padding: 0 10px; border-radius: 5px;}
  .search_hot li a:hover{ color: #000; background-color: #fdd000; }
  .search_slide_star{ margin-bottom: 20px; }
  .search_slide_star_pic{ width: 30%; max-width: 60px; margin-right: 12px; }
  .search_slide_star_pic img{ border-radius: 5px; }
  .search_slide_star_info{ width: 68%; }
  .search_slide_star_info h4{ font-size: 12px; color: #333333; margin:0 0 6px 0; padding-top: 4px; }
  .search_slide_star_info h4 a img{ display: inline-block; width: 20px; margin-left: 4px; }
  .search_slide_star_info p{ height: 20px; line-height: 20px; font-size: 12px; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .search_slide_star_info p a{ display: inline-block; margin-right: 10px;}
  .i_topic_box{ width: 100%; border:1px solid #eee;position:relative;padding:0 0 8px 0;}
  .i_topic_box:before{content:'';position:absolute;top:0;left:0;background:url(/images/new_index/add.png);width:21px;height:20px;}
  .i_topic_box dt{ background-color:#eee;color:#333;line-height:25px;padding:5px 20px;overflow:hidden;font-weight:normal;font-size:14px;}
  .i_topic_box dd{font-size:14px;color:#999;padding:10px 10px 0;}
  .i_topic_box dd a{color:inherit;}
  .i_topic_box dd:nth-child(2){overflow:hidden;}
  .i_topic_box dd i{font-size:14px;margin-right:5px;color:#cacaca;}

  .circle_list_top p i.icon_zan{ color: #ffbd00; }
  @media screen and (min-width:1000px){
    .search_slide{ padding-left: 0; }
  }
  @media screen and (max-width:760px){
    .search_main{ padding: 20px 5%; }
    .search_input{ width: 68%; }
    .search_btn{ width: 30%; }
    .search_moment_left{ display: none; }
    .search_moment_main{ width: 100%; float: initial; }
    .new_index_wrap{width:100%;}
  }

  .search_circle_pic {
    display: block;
    left: 16px;
  }
  .search_circle_wrap{
    height: 164px;
    position: relative;
  }

  .search_circle_main p {
    width: 100%;
  }




</style>
