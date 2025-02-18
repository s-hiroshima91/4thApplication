
    var arrey ;
    var flag ;

    function mkary(n)
    {
      arrey = new Array(n) ;
      for (let j = 0 ; j < n ; j++)
      {
        arrey[j] = new Array(n).fill(0) ;
      }
      return arrey ;
    }
    
    function mkflag(n)
    {
      flag = new Array(n) ;
      for (let j = 0 ; j < n ; j++)
      {
        flag[j] = new Array(n).fill(1) ;
      }
      for(i = 1 ; i < n - 1 ; i++)
      {
        for(j = 1 ; j < n - 1 ; j++)
        {
          flag[i][j] = arrey[i][j] ;
        }
      }
      return flag ;
    }
    
    function start()
    {
      clearTbody() ;
      let n = document.getElementById("matl").value ;
      let bomb = document.getElementById("bombnum").value ;
      repla(n , bomb) ;
      n = Number(n) ;
      arrey = mkary(n + 2) ;
      arrey = mkbomb(Number(bomb) , n) ;
      flag = mkflag(n + 2) ;
      drowtbl(n) ;
      arrey = initial(n) ;
      putchar(n) ;
    }

    function clearTbody()
    {
      let tbodies = document.getElementById("tmine") ;
      while( tbodies.rows[ 0 ] ) tbodies.deleteRow( 0 ) ;
    }
    
    function drowtbl(n)
    {
      let tbodies = document.getElementById("tmine") ;
      for (let i = 0 ; i < n ; i++ )
      {
        let row = document.createElement("tr") ;
        for (let j = 0 ; j < n ; j++)
        {
          let cell = document.createElement("td") ;
          hoge =i + "cell" + j ;
          cell.id = hoge ;
          cell.style.width = "40px";
          cell.setAttribute('onclick' , 'gtid(this)') ;
          row.appendChild(cell) ;
        }
        tbodies.appendChild(row) ;
      }
      document.getElementById("mine").appendChild(tbodies) ;
    }
    
    function mkbomb(bomb , n)
    {
      let i = 0 ;
      while(i < bomb)
      {
        let spn =1 + parseInt(n * Math.random()) ;
        let rw =1 + parseInt(n * Math.random());   

        if ( arrey[spn][rw]==0)
        {
          arrey[spn][rw] = 10 ;
          i++ ;
        }
      }
      return arrey ;
    }
    
    function initial(n)
    {
      for (let x = 1 ; x < n + 1 ; x++)
      {
        for(let y = 1 ; y < n + 1 ; y++)
        {
          if(arrey[x][y] != 10)
          {
            let i = 0 ;
            for(let z = 0 ; z < 3 ; z++)
            {
              for(let w = 0 ; w < 3 ; w++)
              {
                i += parseInt(arrey[x + z -1][y + w - 1]/10) ;
              }
            }
            arrey[x][y] = i ;
          }
        }
      }
      return arrey ;
    }
    
    function putchar(n)
    {
      for (let i = 0 ; i < n ; i++)
      {
        for (let j = 0 ; j < n ; j++ )
        {
          document.getElementById(i + "cell" + j).style.backgroundColor = "gray";
          document.getElementById( i + "cell" + j ).innerText = "" ;
          document.getElementById( i + "cell" + j ).style.color = "gray" ;
        }
      }
	}

    function gtid(obj) 
    {
      let n = gtcell() ;
      obj.style.backgroundColor = 'white';
      let hoge = obj.id ;
      let huga = hoge.split('cell');
      let i = Number(huga[0]) + 1 ;
      let j = Number(huga[1]) + 1 ;
      flag[i][j] = 1 ;
      if (0 < arrey[i][j] && arrey[i][j] < 10 )
      {
        document.getElementById(hoge).innerText = arrey[i][j] ;
      }
      else if (arrey[i][j] == 0)
      {
        flag = opcell(i , j , n) ;
      }
      else if (arrey[i][j] == 10)
      {
        for (let x = 1 ; x < n + 1 ; x++)
        {
          for (let y = 1 ; y < n + 1 ; y++ )
          {
            document.getElementById((x - 1) + "cell" + (y - 1)).style.backgroundColor = "white";
            if (arrey[x][y] == 10)
            {
              document.getElementById((x - 1) + "cell" + (y - 1)).innerText = "★" ;
              document.getElementById((x - 1) + "cell" + (y - 1)).style.color = "red" ;
            }
            else if(arrey[x][y] != 0)
            {   
              document.getElementById((x - 1) + "cell" + (y - 1)).innerText = arrey[x][y] ;
            }
          }
        }
        playfull(1) ;
      }
      let judge = flagjudge(n) ; 
      if(judge > 0)
      {
        playfull(0) ;
      }
    }
    
    function flagjudge(n)
    {
      let judge = 1 ;
      for (let i = 0 ; i < n + 2 ; i++)
      {
        for (let j = 0 ; j < n + 2 ; j++)
        {
          judge *= flag[i][j] ;
        }
      }
      return judge ;
    }
        
    function opcell(i , j , n)
    {
      flag[i + 1][j] += 0.5 ;
      flag[i - 1][j] += 0.5 ;
      flag[i][j + 1] += 0.5 ;
      flag[i][j - 1] += 0.5 ;
      let next = 1 ;
      arop(i + 1 , j) ;
      arop(i - 1 , j) ;
      arop(i , j + 1) ;
      arop(i , j - 1) ;
      
      while(next ==1)
      {
        next = 0 ;
        for(x = 1 ; x < n + 1 ; x++)
        {
          for(y = 1 ; y < n + 1 ; y++)
          {
            let op = flag[x][y] + arrey[x][y] ;
            if(op == 0.5)
            {
              flag[x][y] = 1 ;
              arop(x + 1 , y);
              arop(x - 1 , y);
              arop(x , y + 1);
              arop(x , y - 1);
              flag[x + 1][y] = parseInt(flag[x + 1][y]) + 0.5 ;
              flag[x - 1][y] = parseInt(flag[x - 1][y]) + 0.5 ;
              flag[x][y + 1] = parseInt(flag[x][y + 1]) + 0.5 ;
              flag[x][y - 1] = parseInt(flag[x][y - 1]) + 0.5 ;
              next = 1 ;
            }
          }
        }
      }
      return flag ;
    }
    
    function arop(x , y)
    {
      let n = gtcell();
      if(0 < x && x < n + 1 && 0 < y && y < n + 1)
      {
        if (arrey[x][y] > 0)
        {
          document.getElementById((x - 1) + "cell" + (y - 1)).innerText = arrey[x][y] ;
        }
        document.getElementById((x - 1) + "cell" + (y - 1)).style.backgroundColor = "white" ;
      }
    }
    
    function gtcell()
    {
      let str = document.getElementById("setting").innerText ;
      str = str.slice(4) ;
      str = str.split(/\n/) ;
      return Number(str[0]) ;
    }
    
    function repla(n , bomb)
    {
     let str ="行列数は" + n + "<br>爆弾は" + bomb + "個" ;
     document.getElementById("setting").innerHTML = str ;
    }
    
    function playfull(n)
    {
      let str = n * 3 + parseInt(3 * Math.random()) ;
      let popup = ["やるやん！"] ;
      popup.push("へ～、クリアできたんだ\nべ、べつにあんたのこと褒めてるわけじゃないんだからね。") ;
      popup.push("おめでとう(遠い目)") ;
      popup.push("草不可避") ;
      popup.push("マインスイーパでミスるのが許されるのは\n小学生までだよね～") ;
      popup.push("ざんねん") ;
      alert(popup[str]) ;
    }